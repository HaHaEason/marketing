#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PID_FILE="$FRONTEND_DIR/var/run/frontend.pid"

is_expected_process() {
  local pid="$1"
  local cmdline
  cmdline="$(ps -p "$pid" -o args= 2>/dev/null || true)"
  [[ -n "$cmdline" ]] && { [[ "$cmdline" == *"next dev"* ]] || [[ "$cmdline" == *"next start"* ]] || [[ "$cmdline" == *"npm run dev"* ]] || [[ "$cmdline" == *"npm run start"* ]]; }
}

if [[ ! -f "$PID_FILE" ]]; then
  echo "PID file not found." >&2
  exit 1
fi

pid="$(cat "$PID_FILE")"
if kill -0 "$pid" 2>/dev/null; then
  if ! is_expected_process "$pid"; then
    echo "PID $pid is running but not the frontend. Not stopping." >&2
    exit 1
  fi
  kill -- "-$pid"
  echo "Stopped frontend process group (PGID $pid)."
  rm -f "$PID_FILE"
  exit 0
fi

echo "Process not running for PID $pid. Removing stale PID file." >&2
rm -f "$PID_FILE"
exit 1
