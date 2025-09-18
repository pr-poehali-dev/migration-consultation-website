#!/bin/bash

echo "🤖 Тест Telegram бота с помощью curl"
echo "📅 Время: $(date)"
echo ""

# Тестовые данные
TEST_DATA='{
  "name": "Тест Иванов",
  "phone": "+7 912 345 67 89",
  "messenger": "whatsapp",
  "service": "Консультация по РВП",
  "message": "Тестовое сообщение для проверки Telegram бота",
  "urgentConsultation": true,
  "price": 3500,
  "timestamp": "'$(date '+%d.%m.%Y %H:%M:%S')'"
}'

echo "📤 Отправляем тестовые данные:"
echo "$TEST_DATA" | python3 -m json.tool 2>/dev/null || echo "$TEST_DATA"
echo ""

echo "⏳ Выполняется запрос к Telegram боту..."
echo "🌐 URL: https://functions.poehali.dev/a9299a8a-df29-4247-808f-4903c8fb7c42"
echo ""

# Выполняем запрос
RESPONSE=$(curl -s -w "\n%{http_code}\n%{time_total}" \
  -X POST \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA" \
  https://functions.poehali.dev/a9299a8a-df29-4247-808f-4903c8fb7c42)

# Разбираем ответ
BODY=$(echo "$RESPONSE" | head -n -2)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 2 | head -n 1)
TIME_TOTAL=$(echo "$RESPONSE" | tail -n 1)

echo "📊 РЕЗУЛЬТАТЫ ТЕСТА"
echo "=================="
echo "✅ HTTP статус: $HTTP_CODE"
echo "⏱️  Время ответа: ${TIME_TOTAL}s"
echo ""

echo "📨 Ответ сервера:"
echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
echo ""

echo "📋 Анализ результата:"
if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
    echo "✅ ТЕСТ ПРОЙДЕН - HTTP статус успешный ($HTTP_CODE)"
    echo "📱 Telegram уведомление должно быть отправлено"
    echo "🔍 Проверьте Telegram чат на наличие нового сообщения"
else
    echo "❌ ТЕСТ ПРОВАЛЕН - HTTP статус ошибки ($HTTP_CODE)"
    if [ "$HTTP_CODE" = "000" ]; then
        echo "🌐 Проблема с сетевым соединением"
    elif [ "$HTTP_CODE" = "404" ]; then
        echo "🔍 Функция не найдена - проверьте URL"
    elif [ "$HTTP_CODE" = "500" ]; then
        echo "🔧 Внутренняя ошибка сервера"
    fi
fi

echo ""
echo "🏁 Тест завершен"