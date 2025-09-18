// Прямой тест Telegram бота без внешних зависимостей
const https = require('https');

const testData = JSON.stringify({
  name: 'Тест Иванов',
  phone: '+7 912 345 67 89',
  messenger: 'whatsapp',
  service: 'Консультация по РВП',
  message: 'Тестовое сообщение для проверки Telegram бота',
  urgentConsultation: true,
  price: 3500,
  timestamp: new Date().toLocaleString('ru-RU')
});

const options = {
  hostname: 'functions.poehali.dev',
  port: 443,
  path: '/a9299a8a-df29-4247-808f-4903c8fb7c42',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testData)
  }
};

console.log('🤖 Тестирование Telegram бота (прямой HTTP запрос)');
console.log('📅 Время:', new Date().toLocaleString('ru-RU'));
console.log('\n📤 Отправляем тестовые данные:');

try {
  const parsed = JSON.parse(testData);
  console.log(JSON.stringify(parsed, null, 2));
} catch (e) {
  console.log(testData);
}

console.log('\n⏳ Выполняется запрос...');
console.log('🌐 URL: https://functions.poehali.dev/a9299a8a-df29-4247-808f-4903c8fb7c42');

const req = https.request(options, (res) => {
  console.log('\n📊 РЕЗУЛЬТАТЫ ТЕСТА');
  console.log('==================');
  console.log(`✅ HTTP статус: ${res.statusCode} ${res.statusMessage}`);
  
  console.log('\n📋 Заголовки ответа:');
  Object.entries(res.headers).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
  });
  
  let body = '';
  
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log('\n📨 Ответ сервера:');
    
    try {
      const jsonResponse = JSON.parse(body);
      console.log(JSON.stringify(jsonResponse, null, 2));
    } catch (e) {
      console.log(`"${body}"`);
    }
    
    console.log('\n📋 Анализ результата:');
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('✅ ТЕСТ ПРОЙДЕН - HTTP статус успешный');
      console.log('📱 Telegram уведомление должно быть отправлено');
      console.log('🔍 Проверьте Telegram чат на наличие нового сообщения');
    } else {
      console.log(`❌ ТЕСТ ПРОВАЛЕН - HTTP статус ошибки (${res.statusCode})`);
      if (res.statusCode === 404) {
        console.log('🔍 Функция не найдена - проверьте URL');
      } else if (res.statusCode === 500) {
        console.log('🔧 Внутренняя ошибка сервера');
      } else if (res.statusCode === 400) {
        console.log('📝 Некорректные данные запроса');
      }
    }
    
    console.log('\n🏁 Тест завершен');
  });
});

req.on('error', (error) => {
  console.error('\n❌ Ошибка при выполнении запроса:');
  console.error(`   Тип ошибки: ${error.constructor.name}`);
  console.error(`   Сообщение: ${error.message}`);
  console.error(`   Код: ${error.code || 'неизвестен'}`);
  
  console.log('\n📋 Анализ результата:');
  console.log('❌ ТЕСТ ПРОВАЛЕН - сетевая ошибка');
  
  if (error.code === 'ENOTFOUND') {
    console.log('🌐 Проблема с разрешением DNS');
  } else if (error.code === 'ECONNREFUSED') {
    console.log('🔐 Соединение отклонено сервером');
  } else if (error.code === 'ETIMEDOUT') {
    console.log('⏰ Тайм-аут соединения');
  }
  
  console.log('\n🏁 Тест завершен с ошибкой');
});

req.write(testData);
req.end();