// КРИТИЧЕСКИЙ ТЕСТ - Выполнение node test-email-simple.js
const https = require('https');

console.log('🚨 КРИТИЧЕСКИЙ ТЕСТ EMAIL ФУНКЦИИ');
console.log('🚨 ВЫПОЛНЕНИЕ: node test-email-simple.js');
console.log('=' .repeat(50));
console.log('⏰ Начало:', new Date().toLocaleString('ru-RU'));
console.log('🏗️ Node.js:', process.version);
console.log('');

// Точно такие же данные как в test-email-simple.js
const testData = {
  name: 'Тест Тестов',
  phone: '+7 912 345 67 89',
  messenger: 'telegram',
  service: 'Консультация по РВП',
  message: 'Тестовое сообщение',
  urgentConsultation: false
};

console.log('🔧 Тестирование backend функции отправки email');
console.log('📧 URL: https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7');
console.log('📤 Отправляем тестовую заявку...');
console.log('');

const postData = JSON.stringify(testData);
const options = {
  hostname: 'functions.poehali.dev',
  path: '/de88ac79-adac-4fb5-a2a7-30f8061abbd7',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🌐 Устанавливаем соединение...');

const req = https.request(options, (res) => {
  console.log('✅ Статус ответа:', res.statusCode);
  console.log('📋 Заголовки:', JSON.stringify(res.headers, null, 2));

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('');
    console.log('📨 Ответ сервера:');
    
    try {
      const result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 2));
      
      console.log('');
      console.log('🔍 АНАЛИЗ РЕЗУЛЬТАТА:');
      
      if (res.statusCode >= 200 && res.statusCode < 300) {
        if (result.success === true) {
          console.log('🎉 УСПЕХ! EMAIL ОТПРАВЛЕН УСПЕШНО!');
          console.log('✅ Backend функция работает корректно');
          console.log('✅ SMTP отправка выполнена');
          console.log('📧 Email доставлен на: 89126994560@mail.ru');
          console.log('💬 Сообщение:', result.message || 'Заявка отправлена');
        } else if (result.error) {
          console.log('❌ ОШИБКА! EMAIL НЕ ОТПРАВЛЕН!');
          console.log('❗ Причина:', result.error);
        }
      } else if (res.statusCode === 400) {
        console.log('❌ ОШИБКА ВАЛИДАЦИИ (400)');
        console.log('❗ Проблема с данными запроса');
        if (result.error) {
          console.log('❗ Детали:', result.error);
        }
      } else if (res.statusCode === 500) {
        console.log('❌ СЕРВЕРНАЯ ОШИБКА (500)');
        console.log('❗ Проблема с backend функцией');
        if (result.error) {
          console.log('❗ Детали:', result.error);
          
          if (result.error.includes('Email configuration missing')) {
            console.log('💡 ПРИЧИНА: Отсутствуют SMTP переменные окружения');
            console.log('🔧 РЕШЕНИЕ: Настройте SENDER_EMAIL и SENDER_PASSWORD');
          } else if (result.error.includes('SMTP') || result.error.includes('Authentication')) {
            console.log('💡 ПРИЧИНА: Проблемы с SMTP аутентификацией');
            console.log('🔧 РЕШЕНИЕ: Проверьте SMTP credentials');
          }
        }
      }
      
    } catch (parseError) {
      console.log('Сырой ответ:', data);
      console.log('❌ Ошибка парсинга JSON:', parseError.message);
    }
    
    console.log('');
    console.log('🔚 Тест завершен');
    console.log('⏰ Конец:', new Date().toLocaleString('ru-RU'));
  });
});

req.on('error', (error) => {
  console.error('');
  console.error('💥 КРИТИЧЕСКАЯ ОШИБКА!');
  console.error('❌ Не удалось подключиться к серверу');
  console.error('🔍 Ошибка:', error.message);
  console.error('🔍 Код:', error.code);
  
  console.log('');
  console.log('💡 ВОЗМОЖНЫЕ ПРИЧИНЫ:');
  if (error.code === 'ENOTFOUND') {
    console.log('   • DNS проблемы с functions.poehali.dev');
    console.log('   • Отсутствует интернет соединение');
  } else if (error.code === 'ECONNREFUSED') {
    console.log('   • Backend сервис недоступен');
    console.log('   • Проблемы с hosting провайдером');
  } else {
    console.log('   • Сетевые проблемы');
    console.log('   • Firewall блокировка');
  }
  
  console.log('');
  console.log('🔧 РЕКОМЕНДАЦИИ:');
  console.log('   • Проверьте интернет соединение');
  console.log('   • Попробуйте позже');
  console.log('   • Проверьте статус https://functions.poehali.dev');
});

req.on('timeout', () => {
  console.error('⏰ ТАЙМАУТ! Сервер не отвечает');
  req.destroy();
});

// Таймаут 10 секунд
req.setTimeout(10000);

console.log('📡 Отправляем запрос...');
req.write(postData);
req.end();