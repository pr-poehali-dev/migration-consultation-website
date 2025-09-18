import json
import urllib.request
import urllib.parse
from typing import Dict, Any
import os

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send form submissions to Telegram bot
    Args: event - dict with httpMethod, body containing form data
          context - object with request_id
    Returns: HTTP response with success/error status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'isBase64Encoded': False,
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        print("=== TELEGRAM BOT FUNCTION START ===")
        
        # Parse form data
        body_data = json.loads(event.get('body', '{}'))
        print(f"Parsed body: {body_data}")
        
        name = body_data.get('name', '')
        phone = body_data.get('phone', '')
        messenger = body_data.get('messenger', 'telegram')
        message = body_data.get('message', '')
        service = body_data.get('service', '')
        urgent_consultation = body_data.get('urgentConsultation', False)
        price = body_data.get('price', 0)
        website = body_data.get('website', 'сайта')
        
        # Validate required fields
        if not name or not phone or not service:
            print(f"Validation failed: name={name}, phone={phone}, service={service}")
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Заполните обязательные поля'})
            }
        
        # Get Telegram credentials from environment
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
        
        if not bot_token or not chat_id:
            print(f"Telegram config missing: bot_token={bool(bot_token)}, chat_id={bool(chat_id)}")
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Telegram configuration missing'})
            }
        
        # Format message
        urgent_text = "🔥 СРОЧНАЯ" if urgent_consultation else "Обычная"
        price_text = f"{price} ₽" if price > 0 else "не указана"
        
        telegram_message = f"""🆕 *Новая заявка с {website}*

👤 *Клиент:* {name}
📞 *Телефон:* `{phone}`
💬 *Мессенджер:* {messenger}
🏢 *Услуга:* {service}
⚡ *Срочность:* {urgent_text}
💰 *Стоимость:* {price_text}

📝 *Сообщение:*
{message if message else '_Не указано_'}

⏰ *Время:* {body_data.get('timestamp', 'не указано')}
🆔 *ID запроса:* `{getattr(context, 'request_id', 'unknown')}`"""
        
        # Send to Telegram
        telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        telegram_data = {
            'chat_id': chat_id,
            'text': telegram_message,
            'parse_mode': 'Markdown',
            'disable_web_page_preview': True
        }
        
        data = urllib.parse.urlencode(telegram_data).encode('utf-8')
        req = urllib.request.Request(telegram_url, data=data, method='POST')
        req.add_header('Content-Type', 'application/x-www-form-urlencoded')
        
        print(f"Sending to Telegram chat: {chat_id}")
        
        with urllib.request.urlopen(req) as response:
            response_data = response.read().decode('utf-8')
            telegram_result = json.loads(response_data)
            
            if telegram_result.get('ok'):
                print("Telegram message sent successfully!")
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Уведомление отправлено в Telegram'
                    })
                }
            else:
                print(f"Telegram API error: {telegram_result}")
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Ошибка Telegram API'})
                }
        
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Некорректные данные'})
        }
    except Exception as e:
        print(f"General error: {e}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Ошибка отправки в Telegram: {str(e)}'})
        }