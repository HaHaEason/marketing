#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PID_FILE="$BACKEND_DIR/var/run/backend.pid"
EXPECTED_MARKER="uvicorn app.main:app"

is_expected_process() {
  local pid="$1"
  local cmdline
  cmdline="$(ps -p "$pid" -o args= 2>/dev/null || true)"
  [[ -n "$cmdline" ]] && [[ "$cmdline" == *"$EXPECTED_MARKER"* ]]
}

if [[ ! -f "$PID_FILE" ]]; then
  echo "PID file not found." >&2
  exit 1
fi

pid="$(cat "$PID_FILE")"
if kill -0 "$pid" 2>/dev/null; then
  if ! is_expected_process "$pid"; then
    echo "PID $pid is running but not the backend. Not stopping." >&2
    exit 1
  fi
  kill "$pid"
  echo "Stopped backend (PID $pid)."
  rm -f "$PID_FILE"
  exit 0
fi

echo "Process not running for PID $pid. Removing stale PID file." >&2
rm -f "$PID_FILE"
exit 1
