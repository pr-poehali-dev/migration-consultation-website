#!/usr/bin/env node

/**
 * Диагностика backend функции отправки email
 * Файл: email-test-diagnosis.js
 * Использование: node email-test-diagnosis.js
 */

const https = require('https');
const { URL } = require('url');

// Конфигурация теста
const config = {
  url: 'https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7',
  testData: {
    name: 'Тест Тестов',
    phone: '+7 912 345 67 89',
    messenger: 'telegram',
    service: 'Консультация по РВП',
    message: 'Тестовое сообщение для диагностики',
    urgentConsultation: false
  },
  timeout: 10000 // 10 секунд
};

console.log('🔧 ДИАГНОСТИКА BACKEND ФУНКЦИИ ОТПРАВКИ EMAIL');
console.log('=' .repeat(60));
console.log(`📅 Время запуска: ${new Date().toLocaleString('ru-RU')}`);
console.log(`🔗 Endpoint: ${config.url}`);
console.log(`⏱️  Таймаут: ${config.timeout}ms`);
console.log(`🏗️  Node.js: ${process.version}`);
console.log('');

// Функция для выполнения HTTP запроса
function makeRequest(url, data, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Email-Test-Client/1.0'
      },
      timeout: timeout
    };

    console.log('📤 Отправляем запрос...');
    console.log('📋 Заголовки:', JSON.stringify(options.headers, null, 2));
    console.log('📦 Данные:', JSON.stringify(data, null, 2));
    console.log('');

    const req = https.request(options, (res) => {
      console.log(`✅ Соединение установлено`);
      console.log(`📊 HTTP Status: ${res.statusCode} ${res.statusMessage}`);
      console.log(`📋 Response Headers:`);
      Object.entries(res.headers).forEach(([key, value]) => {
        console.log(`    ${key}: ${value}`);
      });
      console.log('');

      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
        console.log(`📥 Получен фрагмент данных: ${chunk.length} байт`);
      });

      res.on('end', () => {
        console.log(`🏁 Ответ получен полностью: ${responseData.length} байт`);
        console.log('📨 Сырой ответ:', responseData);
        console.log('');

        try {
          const jsonResponse = JSON.parse(responseData);
          console.log('✅ JSON парсинг успешен');
          console.log('📄 Структурированный ответ:');
          console.log(JSON.stringify(jsonResponse, null, 2));
          
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: jsonResponse,
            rawData: responseData
          });
        } catch (parseError) {
          console.log('❌ Ошибка парсинга JSON:', parseError.message);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: null,
            rawData: responseData,
            parseError: parseError.message
          });
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Ошибка запроса:', error.message);
      console.error('🔍 Тип ошибки:', error.code);
      console.error('📋 Полная ошибка:', error);
      reject(error);
    });

    req.on('timeout', () => {
      console.error(`⏰ Таймаут запроса (${timeout}ms)`);
      req.destroy();
      reject(new Error(`Request timeout after ${timeout}ms`));
    });

    // Отправляем данные
    req.write(postData);
    req.end();
  });
}

// Функция анализа результатов
function analyzeResults(result) {
  console.log('🔍 АНАЛИЗ РЕЗУЛЬТАТОВ');
  console.log('-' .repeat(30));
  
  if (result.statusCode >= 200 && result.statusCode < 300) {
    console.log('✅ HTTP статус: УСПЕХ');
  } else if (result.statusCode >= 400 && result.statusCode < 500) {
    console.log('⚠️  HTTP статус: КЛИЕНТСКАЯ ОШИБКА');
  } else if (result.statusCode >= 500) {
    console.log('❌ HTTP статус: СЕРВЕРНАЯ ОШИБКА');
  } else {
    console.log('❓ HTTP статус: НЕОЖИДАННЫЙ');
  }

  // Анализ CORS заголовков
  const corsHeader = result.headers['access-control-allow-origin'];
  if (corsHeader) {
    console.log('✅ CORS заголовки: Присутствуют');
    console.log(`   Access-Control-Allow-Origin: ${corsHeader}`);
  } else {
    console.log('❌ CORS заголовки: Отсутствуют');
  }

  // Анализ содержимого ответа
  if (result.data) {
    if (result.data.success) {
      console.log('✅ Backend ответ: УСПЕХ');
      console.log(`   Сообщение: ${result.data.message || 'Не указано'}`);
    } else if (result.data.error) {
      console.log('❌ Backend ответ: ОШИБКА');
      console.log(`   Ошибка: ${result.data.error}`);
    } else {
      console.log('❓ Backend ответ: НЕОЖИДАННЫЙ ФОРМАТ');
    }
  } else {
    console.log('❌ Backend ответ: НЕ УДАЛОСЬ РАСПАРСИТЬ');
    if (result.parseError) {
      console.log(`   Ошибка парсинга: ${result.parseError}`);
    }
  }

  console.log('');
}

// Основная функция тестирования
async function runDiagnostics() {
  try {
    console.log('🚀 Запуск диагностики...');
    console.log('');

    const startTime = Date.now();
    const result = await makeRequest(config.url, config.testData, config.timeout);
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`⏱️  Время выполнения: ${duration}ms`);
    console.log('');

    analyzeResults(result);

    // Итоговое заключение
    console.log('📋 ИТОГОВОЕ ЗАКЛЮЧЕНИЕ');
    console.log('=' .repeat(30));
    
    if (result.statusCode === 200 && result.data && result.data.success) {
      console.log('🎉 ДИАГНОСТИКА ПРОЙДЕНА УСПЕШНО!');
      console.log('   ✅ Backend функция работает корректно');
      console.log('   ✅ Email должен быть отправлен');
    } else {
      console.log('🚨 ОБНАРУЖЕНЫ ПРОБЛЕМЫ!');
      console.log('   ❌ Backend функция работает некорректно');
      console.log('   ❌ Email НЕ отправлен');
      
      // Рекомендации по устранению
      console.log('');
      console.log('💡 РЕКОМЕНДАЦИИ:');
      if (result.statusCode === 500) {
        console.log('   • Проверьте переменные окружения (SMTP настройки)');
        console.log('   • Проверьте логи backend функции');
      } else if (result.statusCode === 400) {
        console.log('   • Проверьте формат отправляемых данных');
        console.log('   • Убедитесь, что все обязательные поля заполнены');
      } else if (result.statusCode >= 400) {
        console.log('   • Проверьте URL endpoint функции');
        console.log('   • Проверьте доступность backend сервиса');
      }
    }

  } catch (error) {
    console.error('💥 КРИТИЧЕСКАЯ ОШИБКА ДИАГНОСТИКИ');
    console.error('   Ошибка:', error.message);
    console.error('   Тип:', error.code || 'UNKNOWN');
    
    console.log('');
    console.log('💡 ВОЗМОЖНЫЕ ПРИЧИНЫ:');
    console.log('   • Отсутствует интернет соединение');
    console.log('   • Backend сервис недоступен');
    console.log('   • Неправильный URL endpoint');
    console.log('   • Блокировка firewall/proxy');
  }

  console.log('');
  console.log('🔚 Диагностика завершена');
  console.log(`📅 Время завершения: ${new Date().toLocaleString('ru-RU')}`);
}

// Запуск диагностики
if (require.main === module) {
  runDiagnostics().catch(console.error);
}

module.exports = { runDiagnostics, makeRequest, analyzeResults };