#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PID_DIR="$FRONTEND_DIR/var/run"
LOG_DIR="$FRONTEND_DIR/var/log"
PID_FILE="$PID_DIR/frontend.pid"
STDOUT_LOG="$LOG_DIR/frontend.out.log"
STDERR_LOG="$LOG_DIR/frontend.err.log"
HOST="${NEXT_HOST:-0.0.0.0}"
PORT="${NEXT_PORT:-3000}"

reload=true
env_name="${APP_ENV:-dev}"
skip_install=false

usage() {
  cat <<'USAGE'
Usage: ./scripts/start_frontend.sh [--reload|--no-reload] [--env=dev|prod|test]

Options:
  --reload       Enable auto-reload (default)
  --no-reload    Disable auto-reload
  --skip-install Skip npm install before start
  --env=VALUE    Set APP_ENV to dev, prod, or test (default: dev)
  -h, --help     Show this help message
USAGE
}

for arg in "$@"; do
  case "$arg" in
    --reload)
      reload=true
      ;;
    --no-reload)
      reload=false
      ;;
    --skip-install)
      skip_install=true
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
  [[ -n "$cmdline" ]] && { [[ "$cmdline" == *"next dev"* ]] || [[ "$cmdline" == *"next start"* ]] || [[ "$cmdline" == *"npm run dev"* ]] || [[ "$cmdline" == *"npm run start"* ]]; }
}

if [[ -f "$PID_FILE" ]]; then
  existing_pid="$(cat "$PID_FILE")"
  if kill -0 "$existing_pid" 2>/dev/null; then
    if is_expected_process "$existing_pid"; then
      echo "Frontend already running (PID $existing_pid)." >&2
      exit 1
    fi
    echo "PID $existing_pid is running but not the frontend. Remove $PID_FILE if it is stale." >&2
    exit 1
  fi
  rm -f "$PID_FILE"
fi

cd "$FRONTEND_DIR"

if [[ "$skip_install" == "false" ]]; then
  echo "Ensuring dependencies are installed..." >&2
  npm install
fi

node_env="development"
cmd=(npm run dev -- -H "$HOST" -p "$PORT")
if [[ "$reload" == "false" ]]; then
  node_env="production"
  cmd=(npm run start -- -H "$HOST" -p "$PORT")
fi

APP_ENV="$env_name" NODE_ENV="$node_env" NEXT_TELEMETRY_DISABLED=1 \
  setsid "${cmd[@]}" >"$STDOUT_LOG" 2>"$STDERR_LOG" &

echo $! > "$PID_FILE"

pid="$(cat "$PID_FILE")"
echo "Frontend started."
echo "  env: $env_name"
echo "  host: $HOST"
echo "  port: $PORT"
echo "  pid: $pid"
echo "  pid_file: $PID_FILE"
echo "  stdout_log: $STDOUT_LOG"
echo "  stderr_log: $STDERR_LOG"
echo "  command: ${cmd[*]}"
