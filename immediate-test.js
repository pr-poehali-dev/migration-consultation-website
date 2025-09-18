// НЕМЕДЛЕННОЕ ВЫПОЛНЕНИЕ ТЕСТА TELEGRAM БОТА
const https = require('https');

console.log('🚀 КОМАНДА: node test-telegram.js');
console.log('📋 РЕЗУЛЬТАТ ВЫПОЛНЕНИЯ:');
console.log('='.repeat(50));

// Данные для теста
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

// Параметры запроса
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

console.log('🤖 Тестирование Telegram бота');
console.log('📤 Отправляем тестовые данные:');
console.log(JSON.stringify(JSON.parse(testData), null, 2));
console.log('\n⏳ Выполняется запрос...\n');

// Выполняем запрос
const req = https.request(options, (res) => {
  console.log(`✅ Статус ответа: ${res.statusCode} ${res.statusMessage}`);
  
  let responseBody = '';
  
  res.on('data', (chunk) => {
    responseBody += chunk;
  });
  
  res.on('end', () => {
    console.log('\n📨 Ответ сервера:');
    
    try {
      const jsonResult = JSON.parse(responseBody);
      console.log(JSON.stringify(jsonResult, null, 2));
    } catch (e) {
      console.log(responseBody);
    }

    console.log('\n📊 Результат теста:');
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('✅ Тест ПРОЙДЕН - Telegram уведомление отправлено');
      console.log('📱 Проверьте Telegram чат на наличие сообщения');
    } else {
      console.log('❌ Тест ПРОВАЛЕН - ошибка отправки в Telegram');
    }

    console.log('\n🏁 Тест завершен');
    
    // Дополнительная информация
    console.log('\n' + '='.repeat(50));
    console.log('📊 ПОЛНЫЙ ОТЧЕТ О ВЫПОЛНЕНИИ');
    console.log('='.repeat(50));
    console.log('🌐 URL:', 'https://functions.poehali.dev/a9299a8a-df29-4247-808f-4903c8fb7c42');
    console.log('📝 Метод:', 'POST');
    console.log('📦 Content-Type:', 'application/json');
    console.log('📊 HTTP статус:', res.statusCode);
    console.log('📋 Заголовки ответа:');
    Object.entries(res.headers).forEach(([key, value]) => {
      console.log(`   ${key}: ${value}`);
    });
    console.log('⏰ Время завершения:', new Date().toLocaleString('ru-RU'));
  });
});

req.on('error', (error) => {
  console.error('❌ Ошибка при выполнении запроса:');
  console.error(error.message);
  console.log('\n📊 Результат теста:');
  console.log('❌ Тест ПРОВАЛЕН - сетевая ошибка');
  
  console.log('\n🏁 Тест завершен');
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 ОТЧЕТ ОБ ОШИБКЕ');
  console.log('='.repeat(50));
  console.log('❌ Тип ошибки:', error.constructor.name);
  console.log('📝 Сообщение:', error.message);
  console.log('🔧 Код ошибки:', error.code || 'неизвестен');
  console.log('⏰ Время ошибки:', new Date().toLocaleString('ru-RU'));
});

// Отправляем данные
req.write(testData);
req.end();