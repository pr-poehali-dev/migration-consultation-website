#!/bin/bash

echo "🚀 Универсальный запуск теста Telegram бота"
echo "📅 $(date '+%d.%m.%Y %H:%M:%S')"
echo ""

SUCCESS=false

# Попытка 1: Python
if command -v python3 &> /dev/null; then
    echo "🐍 Попытка 1: Выполнение с Python 3"
    echo "====================================="
    if python3 test-telegram.py; then
        SUCCESS=true
        echo "✅ Python тест выполнен успешно!"
    else
        echo "❌ Python тест завершился с ошибкой"
    fi
    echo ""
fi

# Попытка 2: Bash/curl (если Python не сработал)
if [ "$SUCCESS" = false ] && command -v curl &> /dev/null; then
    echo "🌐 Попытка 2: Выполнение с curl"
    echo "==============================="
    if bash curl-telegram-test.sh; then
        SUCCESS=true
        echo "✅ Curl тест выполнен успешно!"
    else
        echo "❌ Curl тест завершился с ошибкой"
    fi
    echo ""
fi

# Попытка 3: Bun (если предыдущие не сработали)
if [ "$SUCCESS" = false ] && command -v bun &> /dev/null; then
    echo "🏃 Попытка 3: Выполнение с Bun"
    echo "============================="
    if bun simple-telegram-test.js; then
        SUCCESS=true
        echo "✅ Bun тест выполнен успешно!"
    else
        echo "❌ Bun тест завершился с ошибкой"
    fi
    echo ""
fi

# Попытка 4: Node.js (если предыдущие не сработали)
if [ "$SUCCESS" = false ] && command -v node &> /dev/null; then
    echo "🟢 Попытка 4: Выполнение с Node.js"
    echo "================================="
    if node test-telegram.js; then
        SUCCESS=true
        echo "✅ Node.js тест выполнен успешно!"
    else
        echo "❌ Node.js тест завершился с ошибкой"
    fi
    echo ""
fi

# Итоговый результат
echo "📊 ФИНАЛЬНЫЙ РЕЗУЛЬТАТ"
echo "====================="
if [ "$SUCCESS" = true ]; then
    echo "✅ Тест успешно выполнен!"
    echo "📱 Проверьте Telegram чат на наличие тестового сообщения"
    exit 0
else
    echo "❌ Все попытки выполнения теста не удались"
    echo "🔍 Проверьте:"
    echo "   - Наличие Python 3, curl, bun или Node.js"
    echo "   - Интернет-соединение"
    echo "   - Правильность URL функции"
    exit 1
fi