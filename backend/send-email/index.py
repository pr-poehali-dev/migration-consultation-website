import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import os
import traceback

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send form submissions via email
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
            'body': json.dumps({'error': 'Method not allowed'}, ensure_ascii=False)
        }
    
    try:
        # Логируем входящий запрос для диагностики
        print(f"Incoming request: method={method}, body={event.get('body', '{}')}")
        
        # Parse form data
        body_data = json.loads(event.get('body', '{}'))
        
        name = body_data.get('name', '')
        phone = body_data.get('phone', '')
        messenger = body_data.get('messenger', 'telegram')
        message = body_data.get('message', '')
        service = body_data.get('service', '')
        urgent_consultation = body_data.get('urgentConsultation', False)
        
        # Validate required fields
        if not name or not phone or not service:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Заполните обязательные поля'}, ensure_ascii=False)
            }
        
        # Get email credentials from environment
        smtp_server = os.environ.get('SMTP_SERVER', 'smtp.mail.ru')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        sender_email = os.environ.get('SENDER_EMAIL', '')
        sender_password = os.environ.get('SENDER_PASSWORD', '')
        recipient_email = '89126994560@mail.ru'
        
        if not sender_email or not sender_password:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Email configuration missing'}, ensure_ascii=False)
            }
        
        # Create email message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = f"Новая заявка с сайта: {service}"
        
        # Email body
        urgent_text = "ДА (срочная)" if urgent_consultation else "Нет"
        email_body = f"""
Новая заявка с сайта миграционных услуг

Клиент: {name}
Телефон: {phone}
Предпочитаемый мессенджер: {messenger}
Услуга: {service}
Срочная консультация: {urgent_text}

Сообщение:
{message if message else 'Не указано'}

---
Заявка отправлена автоматически с сайта
ID запроса: {context.request_id}
"""
        
        msg.attach(MIMEText(email_body, 'plain', 'utf-8'))
        
        # Send email
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, recipient_email, text)
        server.quit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена'
            }, ensure_ascii=False)
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Некорректные данные'}, ensure_ascii=False)
        }
    except Exception as e:
        # Логируем полную ошибку для диагностики
        error_details = {
            'error': str(e),
            'traceback': traceback.format_exc(),
            'request_id': context.request_id
        }
        print(f"Email send error: {json.dumps(error_details, ensure_ascii=False)}")
        
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Ошибка отправки: {str(e)}'}, ensure_ascii=False)
        }