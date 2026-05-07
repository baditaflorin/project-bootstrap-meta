#!/usr/bin/env sh
set -eu

PORT="${PORT:-4173}"
BASE_URL="http://127.0.0.1:${PORT}/project-bootstrap-meta/"
LOG_FILE="${TMPDIR:-/tmp}/project-bootstrap-meta-preview.log"

npm run build

npm run preview -- --host 127.0.0.1 --port "$PORT" >"$LOG_FILE" 2>&1 &
SERVER_PID=$!

cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

i=0
until curl -fsS "$BASE_URL" >/dev/null 2>&1; do
  i=$((i + 1))
  if [ "$i" -gt 40 ]; then
    echo "Preview server did not become ready. Log:"
    cat "$LOG_FILE"
    exit 1
  fi
  sleep 0.25
done

PLAYWRIGHT_BASE_URL="$BASE_URL" npm run smoke
