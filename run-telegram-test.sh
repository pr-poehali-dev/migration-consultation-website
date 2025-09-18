#!/bin/bash
echo "🔍 Проверка версии Node.js:"
node --version

echo -e "\n🔍 Проверка наличия npm:"
npm --version

echo -e "\n🚀 Выполнение теста Telegram бота..."
echo "================================================"
node test-telegram.js
echo "================================================"
echo "✅ Выполнение завершено"