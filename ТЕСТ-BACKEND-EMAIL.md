# Тест Backend функции отправки Email

Этот файл содержит инструкции для тестирования backend функции отправки email.

## URL функции
`https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7`

## Способы запуска теста

### 1. Тест с помощью Node.js

```bash
node test-email-backend.js
```

**Требования:** Node.js версии 18+ (для поддержки fetch API)

### 2. Тест с помощью curl

```bash
chmod +x test-email-curl.sh
./test-email-curl.sh
```

**Требования:** curl и jq (для форматирования JSON)

Если jq не установлен:
- Ubuntu/Debian: `sudo apt install jq`
- macOS: `brew install jq`
- Windows: установить через chocolatey `choco install jq`

### 3. Ручной curl запрос

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Тест Тестович",
    "phone": "+7 912 345 67 89",
    "messenger": "whatsapp",
    "service": "Тестовая услуга",
    "message": "Тестовое сообщение",
    "urgentConsultation": true
  }' \
  https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7
```

## Структура тестовых данных

```json
{
  "name": "Имя пользователя",
  "phone": "+7 XXX XXX XX XX",
  "messenger": "telegram|whatsapp|viber",
  "service": "Название услуги",
  "message": "Дополнительное сообщение",
  "urgentConsultation": true|false
}
```

## Ожидаемые результаты

### Успешный ответ (статус 200)
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Ошибка валидации (статус 400)
```json
{
  "success": false,
  "error": "Validation error message"
}
```

### Серверная ошибка (статус 500)
```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Интерпретация результатов

- **✅ Статус 200-299:** Функция работает корректно, email отправлен
- **❌ Статус 400-499:** Ошибка в данных запроса (проверьте формат данных)
- **❌ Статус 500-599:** Ошибка сервера (проблемы с backend функцией)
- **❌ Сетевая ошибка:** Проблемы с подключением или URL