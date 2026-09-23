#!/usr/bin/env bash
# ==============================================================================
# BUSINESSKIT MVP — ШВИДКИЙ ЗАПУСК ПРОЄКТУ (PORT AUTO-DETECT)
# ==============================================================================

# Check port 3000, fallback to 3001 or 8080 if 3000 is taken
PORT=3000
if lsof -i :$PORT >/dev/null 2>&1; then
  PORT=3001
  if lsof -i :$PORT >/dev/null 2>&1; then
    PORT=8080
  fi
fi

echo "========================================================"
echo "✨ BusinessKit MVP: White-Label Booking & CRM Web App"
echo "========================================================"

if command -v npm &> /dev/null; then
  echo "✅ Виявлено Node.js та npm."
  echo "🚀 Запуск через Vite сервер розробки..."
  npm install
  npm run dev
else
  echo "🌐 Запуск швидкого автономного веб-сервера (Python 3):"
  echo "👉 ВІДКРИЙТЕ У БРАУЗЕРІ: http://localhost:$PORT"
  echo "========================================================"
  python3 -m http.server $PORT
fi
