#!/usr/bin/env python3
"""
Тест Telegram бота для отправки заявок
"""

import json
import urllib.request
import urllib.error
import datetime
import sys

def test_telegram_bot():
    """Выполняет тест отправки заявки в Telegram бот"""
    
    print("🤖 Тестирование Telegram бота")
    print(f"📅 Время: {datetime.datetime.now().strftime('%d.%m.%Y %H:%M:%S')}")
    print("")
    
    # Тестовые данные
    test_data = {
        "name": "Тест Иванов",
        "phone": "+7 912 345 67 89",
        "messenger": "whatsapp",
        "service": "Консультация по РВП",
        "message": "Тестовое сообщение для проверки Telegram бота",
        "urgentConsultation": True,
        "price": 3500,
        "timestamp": datetime.datetime.now().strftime('%d.%m.%Y %H:%M:%S')
    }
    
    print("📤 Отправляем тестовые данные:")
    print(json.dumps(test_data, ensure_ascii=False, indent=2))
    print("")
    
    # URL функции
    url = "https://functions.poehali.dev/a9299a8a-df29-4247-808f-4903c8fb7c42"
    print(f"🌐 URL: {url}")
    print("⏳ Выполняется запрос...")
    print("")
    
    try:
        # Подготавливаем запрос
        data = json.dumps(test_data).encode('utf-8')
        request = urllib.request.Request(
            url,
            data=data,
            headers={'Content-Type': 'application/json'}
        )
        
        # Выполняем запрос
        with urllib.request.urlopen(request, timeout=30) as response:
            status_code = response.getcode()
            headers = dict(response.headers)
            body = response.read().decode('utf-8')
            
        print("📊 РЕЗУЛЬТАТЫ ТЕСТА")
        print("==================")
        print(f"✅ HTTP статус: {status_code}")
        
        print(f"\n📋 Заголовки ответа:")
        for key, value in headers.items():
            print(f"   {key}: {value}")
        
        print(f"\n📨 Ответ сервера:")
        try:
            json_response = json.loads(body)
            print(json.dumps(json_response, ensure_ascii=False, indent=2))
        except json.JSONDecodeError:
            print(f'Ответ не в формате JSON: "{body}"')
        
        print(f"\n📋 Анализ результата:")
        if 200 <= status_code < 300:
            print("✅ ТЕСТ ПРОЙДЕН - HTTP статус успешный")
            print("📱 Telegram уведомление должно быть отправлено")
            print("🔍 Проверьте Telegram чат на наличие нового сообщения")
            return True
        else:
            print(f"❌ ТЕСТ ПРОВАЛЕН - HTTP статус ошибки ({status_code})")
            return False
            
    except urllib.error.HTTPError as e:
        print("📊 РЕЗУЛЬТАТЫ ТЕСТА")
        print("==================")
        print(f"❌ HTTP ошибка: {e.code}")
        print(f"📝 Описание: {e.reason}")
        
        try:
            error_body = e.read().decode('utf-8')
            print(f"📨 Ответ сервера:")
            try:
                json_error = json.loads(error_body)
                print(json.dumps(json_error, ensure_ascii=False, indent=2))
            except json.JSONDecodeError:
                print(f'"{error_body}"')
        except:
            pass
            
        print(f"\n📋 Анализ результата:")
        print("❌ ТЕСТ ПРОВАЛЕН - HTTP ошибка")
        if e.code == 404:
            print("🔍 Функция не найдена - проверьте URL")
        elif e.code == 500:
            print("🔧 Внутренняя ошибка сервера")
        elif e.code == 400:
            print("📝 Некорректные данные запроса")
        
        return False
        
    except urllib.error.URLError as e:
        print("📊 РЕЗУЛЬТАТЫ ТЕСТА")
        print("==================")
        print(f"❌ Сетевая ошибка: {e.reason}")
        print("📋 Анализ результата:")
        print("❌ ТЕСТ ПРОВАЛЕН - сетевая ошибка")
        print("🌐 Проверьте интернет-соединение")
        return False
        
    except Exception as e:
        print("📊 РЕЗУЛЬТАТЫ ТЕСТА")
        print("==================")
        print(f"❌ Неожиданная ошибка: {e}")
        print(f"📝 Тип ошибки: {type(e).__name__}")
        print("📋 Анализ результата:")
        print("❌ ТЕСТ ПРОВАЛЕН - неожиданная ошибка")
        return False

if __name__ == "__main__":
    print("🚀 Запуск теста Telegram бота")
    print("")
    
    success = test_telegram_bot()
    
    print("")
    print("🏁 Тест завершен")
    
    # Возвращаем код выхода
    sys.exit(0 if success else 1)