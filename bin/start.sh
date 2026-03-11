#!/usr/bin/env bash
# start.sh — better-ccflare 서버 시작 스크립트

set -euo pipefail

# 스크립트가 위치한 디렉토리의 부모(프로젝트 루트)로 이동
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PID_FILE="$PROJECT_DIR/bin/.server.pid"
LOG_FILE="${LOG_FILE:-$PROJECT_DIR/bin/server.log}"
PORT="${PORT:-8080}"

# 이미 실행 중인지 확인
if [[ -f "$PID_FILE" ]]; then
  PID=$(cat "$PID_FILE")
  if kill -0 "$PID" 2>/dev/null; then
    echo "already running (PID $PID). Use bin/stop.sh to stop it first."
    exit 1
  else
    echo "Stale PID file found. Removing..."
    rm -f "$PID_FILE"
  fi
fi

cd "$PROJECT_DIR"

echo "Starting better-ccflare on port $PORT..."
echo "Log: $LOG_FILE"

# 백그라운드로 서버 실행
PORT="$PORT" nohup bun apps/server/src/server.ts --port "$PORT" \
  >> "$LOG_FILE" 2>&1 &

SERVER_PID=$!
echo "$SERVER_PID" > "$PID_FILE"

echo "Started (PID $SERVER_PID)"
echo "Dashboard: http://localhost:$PORT"
