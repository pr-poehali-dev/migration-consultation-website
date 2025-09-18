// Итоговый тестер Telegram бота
console.log('🚀 ВЫПОЛНЕНИЕ КОМАНДЫ: node test-telegram.js');
console.log('='.repeat(50));

// Импорты для HTTP запроса
const https = require('https');

// Тестовые данные (из test-telegram.js)
const testData = {
  name: 'Тест Иванов',
  phone: '+7 912 345 67 89',
  messenger: 'whatsapp',
  service: 'Консультация по РВП',
  message: 'Тестовое сообщение для проверки Telegram бота',
  urgentConsultation: true,
  price: 3500,
  timestamp: new Date().toLocaleString('ru-RU')
};

// Имитируем функцию из test-telegram.js
async function testTelegramBot() {
  console.log('🤖 Тестирование Telegram бота');
  console.log('📤 Отправляем тестовые данные:');
  console.log(JSON.stringify(testData, null, 2));
  console.log('\n⏳ Выполняется запрос...\n');

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(testData);
    
    const options = {
      hostname: 'functions.poehali.dev',
      port: 443,
      path: '/a9299a8a-df29-4247-808f-4903c8fb7c42',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      console.log(`✅ Статус ответа: ${res.statusCode} ${res.statusMessage}`);
      
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        console.log('\n📨 Ответ сервера:');
        
        try {
          const jsonResult = JSON.parse(body);
          console.log(JSON.stringify(jsonResult, null, 2));
        } catch (e) {
          console.log(body);
        }

        console.log('\n📊 Результат теста:');
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ Тест ПРОЙДЕН - Telegram уведомление отправлено');
          console.log('📱 Проверьте Telegram чат на наличие сообщения');
          resolve(true);
        } else {
          console.log('❌ Тест ПРОВАЛЕН - ошибка отправки в Telegram');
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Ошибка при выполнении запроса:');
      console.error('   Тип ошибки:', error.constructor.name);
      console.error('   Сообщение:', error.message);
      if (error.stack) {
        console.error('   Stack trace:', error.stack.split('\n').slice(0, 5).join('\n'));
      }
      console.log('\n📊 Результат теста:');
      console.log('❌ Тест ПРОВАЛЕН - сетевая ошибка');
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Запуск теста (копируем логику из test-telegram.js)
console.log('🚀 Запуск теста Telegram бота...\n');

testTelegramBot()
  .then((success) => {
    console.log('\n🏁 Тест завершен');
    
    // Дополнительная информация
    console.log('\n📋 ДЕТАЛЬНЫЙ ОТЧЕТ');
    console.log('==================');
    console.log('🌐 URL функции: https://functions.poehali.dev/a9299a8a-df29-4247-808f-4903c8fb7c42');
    console.log('📅 Время выполнения:', new Date().toLocaleString('ru-RU'));
    console.log('🔧 Метод: POST');
    console.log('📦 Content-Type: application/json');
    console.log('🎯 Результат:', success ? 'УСПЕХ' : 'НЕУДАЧА');
    
    if (success) {
      console.log('\n✅ ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ');
      console.log('📱 Сообщение должно появиться в Telegram чате');
    }
    
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('\n💥 Критическая ошибка:', error.message);
    
    console.log('\n📋 ДЕТАЛЬНЫЙ ОТЧЕТ ОШИБКИ');
    console.log('========================');
    console.log('❌ Статус: КРИТИЧЕСКАЯ ОШИБКА');
    console.log('🔍 Возможные причины:');
    console.log('   • Отсутствие интернет-соединения');
    console.log('   • Блокировка HTTPS запросов');
    console.log('   • Неправильный URL функции');
    console.log('   • Проблемы на стороне сервера');
    
    process.exit(1);
  });