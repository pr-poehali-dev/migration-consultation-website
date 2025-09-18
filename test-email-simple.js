// Проверяем версию Node.js
console.log('Node.js версия:', process.version);

// Функция для тестирования с использованием https модуля
const https = require('https');

function testEmailWithHttps() {
  const postData = JSON.stringify({
    name: 'Тест Тестов',
    phone: '+7 912 345 67 89',
    messenger: 'telegram',
    service: 'Консультация по РВП',
    message: 'Тестовое сообщение',
    urgentConsultation: false
  });

  const options = {
    hostname: 'functions.poehali.dev',
    path: '/de88ac79-adac-4fb5-a2a7-30f8061abbd7',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  console.log('🔧 Тестирование backend функции отправки email');
  console.log('📧 URL: https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7');
  console.log('📤 Отправляем тестовую заявку...\n');

  const req = https.request(options, (res) => {
    console.log('✅ Статус ответа:', res.statusCode);
    console.log('📋 Заголовки:', JSON.stringify(res.headers, null, 2));

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('\n📨 Ответ сервера:');
      try {
        const result = JSON.parse(data);
        console.log(JSON.stringify(result, null, 2));
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('\n✅ Тест пройден успешно!');
        } else {
          console.log('\n❌ Тест завершился с ошибкой HTTP', res.statusCode);
        }
      } catch (error) {
        console.log('Сырой ответ:', data);
        console.log('\n❌ Ошибка парсинга JSON:', error.message);
      }
      
      console.log('\n🔚 Тест завершен');
    });
  });

  req.on('error', (error) => {
    console.error('❌ Ошибка при отправке запроса:', error.message);
    console.error('Полная ошибка:', error);
  });

  req.write(postData);
  req.end();
}

// Запускаем тест
testEmailWithHttps();