#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PID_DIR="$BACKEND_DIR/var/run"
LOG_DIR="$BACKEND_DIR/var/log"
PID_FILE="$PID_DIR/backend.pid"
STDOUT_LOG="$LOG_DIR/backend.out.log"
STDERR_LOG="$LOG_DIR/backend.err.log"
EXPECTED_MARKER="uvicorn app.main:app"
HOST="${UVICORN_HOST:-0.0.0.0}"
PORT="${UVICORN_PORT:-8000}"

reload=true
env_name="${APP_ENV:-dev}"

usage() {
  cat <<'EOF'
Usage: ./scripts/start_backend.sh [--reload|--no-reload] [--env=dev|prod|test]

Options:
  --reload       Enable auto-reload (default)
  --no-reload    Disable auto-reload
  --env=VALUE    Set APP_ENV to dev, prod, or test (default: dev)
  -h, --help     Show this help message
EOF
}

for arg in "$@"; do
  case "$arg" in
    --reload)
      reload=true
      ;;
    --no-reload)
      reload=false
      ;;
    --env=*)
      env_name="${arg#*=}"
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $arg" >&2
      usage >&2
      exit 1
      ;;
  esac
done

case "$env_name" in
  dev|prod|test)
    ;;
  *)
    echo "Invalid env: $env_name (use dev|prod|test)" >&2
    exit 1
    ;;
esac

mkdir -p "$PID_DIR" "$LOG_DIR"

is_expected_process() {
  local pid="$1"
  local cmdline
  cmdline="$(ps -p "$pid" -o args= 2>/dev/null || true)"
  [[ -n "$cmdline" ]] && [[ "$cmdline" == *"$EXPECTED_MARKER"* ]]
}

if [[ -f "$PID_FILE" ]]; then
  existing_pid="$(cat "$PID_FILE")"
  if kill -0 "$existing_pid" 2>/dev/null; then
    if is_expected_process "$existing_pid"; then
      echo "Backend already running (PID $existing_pid)." >&2
      exit 1
    fi
    echo "PID $existing_pid is running but not the backend. Remove $PID_FILE if it is stale." >&2
    exit 1
  fi
  rm -f "$PID_FILE"
fi

cd "$BACKEND_DIR"
cmd=(uv run uvicorn app.main:app --app-dir "$BACKEND_DIR" --host "$HOST" --port "$PORT")
if [[ "$reload" == "true" ]]; then
  cmd+=(--reload)
fi

APP_ENV="$env_name" "${cmd[@]}" >"$STDOUT_LOG" 2>"$STDERR_LOG" &

echo $! > "$PID_FILE"

pid="$(cat "$PID_FILE")"
echo "Backend started."
echo "  env: $env_name"
echo "  host: $HOST"
echo "  port: $PORT"
echo "  pid: $pid"
echo "  pid_file: $PID_FILE"
echo "  stdout_log: $STDOUT_LOG"
echo "  stderr_log: $STDERR_LOG"
echo "  command: ${cmd[*]}"
