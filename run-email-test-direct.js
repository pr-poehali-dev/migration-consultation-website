// Прямое выполнение теста email функции
const https = require('https');

console.log('🚀 ТЕСТИРОВАНИЕ BACKEND ФУНКЦИИ ОТПРАВКИ EMAIL');
console.log('=' .repeat(60));
console.log('📅 Время запуска:', new Date().toLocaleString('ru-RU'));
console.log('🏗️  Node.js версия:', process.version);
console.log('🔗 URL: https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7');
console.log('');

function testEmailWithHttps() {
  const postData = JSON.stringify({
    name: 'Тест Тестов',
    phone: '+7 912 345 67 89',
    messenger: 'telegram',
    service: 'Консультация по РВП',
    message: 'Тестовое сообщение для диагностики backend функции',
    urgentConsultation: false
  });

  const options = {
    hostname: 'functions.poehali.dev',
    path: '/de88ac79-adac-4fb5-a2a7-30f8061abbd7',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'Node.js-Email-Test/1.0'
    }
  };

  console.log('📤 Отправляем тестовую заявку...');
  console.log('📦 Данные запроса:');
  console.log(JSON.stringify(JSON.parse(postData), null, 2));
  console.log('');
  console.log('📋 HTTP заголовки:');
  console.log(JSON.stringify(options.headers, null, 2));
  console.log('');
  console.log('⏳ Ожидаем ответ от сервера...');
  console.log('');

  const req = https.request(options, (res) => {
    console.log('📊 HTTP ОТВЕТ ПОЛУЧЕН:');
    console.log('✅ Статус код:', res.statusCode);
    console.log('📝 Статус текст:', res.statusMessage);
    console.log('');
    
    console.log('📋 Заголовки ответа:');
    Object.entries(res.headers).forEach(([key, value]) => {
      console.log(`   ${key}: ${value}`);
    });
    console.log('');

    let data = '';
    let chunkCount = 0;

    res.on('data', (chunk) => {
      chunkCount++;
      data += chunk;
      console.log(`📥 Получен фрагмент ${chunkCount}: ${chunk.length} байт`);
    });

    res.on('end', () => {
      console.log('');
      console.log('🏁 ОТВЕТ ПОЛУЧЕН ПОЛНОСТЬЮ');
      console.log(`📏 Общий размер: ${data.length} байт`);
      console.log('');
      
      console.log('📨 СОДЕРЖИМОЕ ОТВЕТА СЕРВЕРА:');
      console.log('─' .repeat(40));
      console.log('Сырые данные:', data);
      console.log('─' .repeat(40));
      
      try {
        const result = JSON.parse(data);
        console.log('');
        console.log('✅ JSON ПАРСИНГ УСПЕШЕН');
        console.log('📄 Структурированный ответ:');
        console.log(JSON.stringify(result, null, 2));
        
        console.log('');
        console.log('🔍 АНАЛИЗ РЕЗУЛЬТАТА:');
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ HTTP статус: УСПЕШНО');
          
          if (result.success === true) {
            console.log('✅ Backend ответ: УСПЕШНО');
            console.log('📧 Email статус: ОТПРАВЛЕН');
            console.log('💬 Сообщение:', result.message || 'Не указано');
            console.log('');
            console.log('🎉 ТЕСТ ПРОЙДЕН УСПЕШНО!');
            console.log('   Backend функция работает корректно');
            console.log('   Заявка должна быть отправлена на email');
          } else if (result.error) {
            console.log('❌ Backend ответ: ОШИБКА');
            console.log('📧 Email статус: НЕ ОТПРАВЛЕН');
            console.log('❗ Ошибка:', result.error);
          } else {
            console.log('❓ Backend ответ: НЕОЖИДАННЫЙ ФОРМАТ');
            console.log('📧 Email статус: НЕИЗВЕСТНО');
          }
        } else if (res.statusCode >= 400 && res.statusCode < 500) {
          console.log('⚠️  HTTP статус: ОШИБКА КЛИЕНТА');
          console.log('📧 Email статус: НЕ ОТПРАВЛЕН');
          if (result.error) {
            console.log('❗ Ошибка:', result.error);
          }
        } else if (res.statusCode >= 500) {
          console.log('❌ HTTP статус: ОШИБКА СЕРВЕРА');
          console.log('📧 Email статус: НЕ ОТПРАВЛЕН');
          if (result.error) {
            console.log('❗ Ошибка:', result.error);
          }
        }
        
      } catch (parseError) {
        console.log('');
        console.log('❌ ОШИБКА ПАРСИНГА JSON');
        console.log('❗ Ошибка:', parseError.message);
        console.log('📧 Email статус: НЕИЗВЕСТНО');
        
        // Попробуем проанализировать сырой ответ
        if (data.includes('success')) {
          console.log('💡 Возможно email отправлен (найдено "success" в ответе)');
        } else if (data.includes('error')) {
          console.log('💡 Возможно произошла ошибка (найдено "error" в ответе)');
        }
      }
      
      console.log('');
      console.log('🔚 ТЕСТИРОВАНИЕ ЗАВЕРШЕНО');
      console.log('📅 Время завершения:', new Date().toLocaleString('ru-RU'));
    });
  });

  req.on('error', (error) => {
    console.log('');
    console.error('💥 КРИТИЧЕСКАЯ ОШИБКА ЗАПРОСА');
    console.error('❗ Ошибка:', error.message);
    console.error('🔍 Код ошибки:', error.code);
    console.error('📧 Email статус: НЕ ОТПРАВЛЕН');
    
    console.log('');
    console.log('💡 ВОЗМОЖНЫЕ ПРИЧИНЫ:');
    console.log('   • Отсутствует интернет соединение');
    console.log('   • Backend сервис недоступен');
    console.log('   • Неправильный URL endpoint');
    console.log('   • Блокировка firewall/proxy');
    console.log('   • SSL/TLS проблемы');
    
    console.log('');
    console.log('🔧 РЕКОМЕНДАЦИИ:');
    console.log('   • Проверьте интернет соединение');
    console.log('   • Проверьте доступность https://functions.poehali.dev');
    console.log('   • Убедитесь что backend функция развернута');
  });

  req.on('timeout', () => {
    console.log('');
    console.error('⏰ ТАЙМАУТ ЗАПРОСА');
    console.error('📧 Email статус: НЕ ОТПРАВЛЕН');
    req.destroy();
  });

  // Устанавливаем таймаут 15 секунд
  req.setTimeout(15000);

  console.log('🌐 Устанавливаем соединение с сервером...');
  req.write(postData);
  req.end();
}

// Запускаем тест
testEmailWithHttps();