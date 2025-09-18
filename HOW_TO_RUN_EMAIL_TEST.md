# Инструкция по тестированию backend функции отправки email

## Файлы для тестирования

### 1. `test-email.js` (оригинальный)
Базовый тест с использованием fetch API
```bash
node test-email.js
```

### 2. `test-email-simple.js` (совместимый)
Тест с использованием встроенного https модуля Node.js
```bash
node test-email-simple.js
```

### 3. `email-test-diagnosis.js` (подробный)
Полная диагностика с детальным анализом
```bash
node email-test-diagnosis.js
```

## Backend функция

- **URL**: https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7
- **Метод**: POST
- **Файл**: `/backend/send-email/index.py`
- **Статус**: Развернута и актуальна

## Структура тестовых данных

```json
{
  "name": "Тест Тестов",
  "phone": "+7 912 345 67 89",
  "messenger": "telegram",
  "service": "Консультация по РВП",
  "message": "Тестовое сообщение",
  "urgentConsultation": false
}
```

## Ожидаемый результат

### При успешной отправке (200 OK):
```json
{
  "success": true,
  "message": "Заявка успешно отправлена"
}
```

### При ошибке (400/500):
```json
{
  "error": "Описание ошибки"
}
```

## Команды для запуска

1. **Простой тест**: `node test-email-simple.js`
2. **Детальная диагностика**: `node email-test-diagnosis.js`

## Проверка логов

После запуска теста проверьте:
- Статус HTTP ответа
- Содержимое ответа сервера
- Наличие CORS заголовков
- Время выполнения запроса