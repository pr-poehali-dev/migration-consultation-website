#!/bin/bash

echo "🚀 Тестирование backend функции отправки email с помощью curl"
echo ""

# URL функции
URL="https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7"

# Тестовые данные
JSON_DATA='{
  "name": "Мария Сидорова",
  "phone": "+7 916 987 65 43",
  "messenger": "telegram",
  "service": "Консультация по документам",
  "message": "Тестовая заявка для проверки backend функции",
  "urgentConsultation": false
}'

echo "📤 Отправляем тестовые данные:"
echo "$JSON_DATA" | jq '.'
echo ""
echo "⏳ Выполняется запрос..."
echo ""

# Выполняем curl запрос с подробным выводом
RESPONSE=$(curl -s -w "\n%{http_code}\n%{time_total}" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "$JSON_DATA" \
  "$URL")

# Разбираем ответ
BODY=$(echo "$RESPONSE" | head -n -2)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 2 | head -n 1)
TIME=$(echo "$RESPONSE" | tail -n 1)

echo "✅ Статус ответа: $HTTP_CODE"
echo "⏱️  Время выполнения: ${TIME}s"
echo ""
echo "📨 Ответ сервера:"

# Пытаемся отформатировать JSON, если это возможно
if echo "$BODY" | jq '.' >/dev/null 2>&1; then
    echo "$BODY" | jq '.'
else
    echo "$BODY"
fi

echo ""
echo "📊 Результат теста:"

if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
    echo "✅ Тест ПРОЙДЕН - функция работает корректно"
    echo "✉️  Email должен быть отправлен"
else
    echo "❌ Тест ПРОВАЛЕН - функция вернула ошибку HTTP $HTTP_CODE"
fi

echo ""
echo "🏁 Тест завершен"