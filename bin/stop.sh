#!/usr/bin/env bash
# stop.sh — better-ccflare 서버 중지 스크립트

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PID_FILE="$PROJECT_DIR/bin/.server.pid"

if [[ ! -f "$PID_FILE" ]]; then
  echo "Server is not running (no PID file found)."
  exit 0
fi

PID=$(cat "$PID_FILE")

if ! kill -0 "$PID" 2>/dev/null; then
  echo "Process $PID is not running. Cleaning up stale PID file."
  rm -f "$PID_FILE"
  exit 0
fi

echo "Stopping better-ccflare (PID $PID)..."
kill "$PID"

# 최대 10초 대기
for i in $(seq 1 10); do
  if ! kill -0 "$PID" 2>/dev/null; then
    rm -f "$PID_FILE"
    echo "Stopped."
    exit 0
  fi
  sleep 1
done

# 정상 종료 안 되면 강제 종료
echo "Process did not stop gracefully. Sending SIGKILL..."
kill -9 "$PID" 2>/dev/null || true
rm -f "$PID_FILE"
echo "Stopped (forced)."
