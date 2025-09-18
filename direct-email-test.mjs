// Прямой тест email функции с использованием fetch
console.log('🚀 КРИТИЧЕСКИЙ ТЕСТ EMAIL ФУНКЦИИ');
console.log('=====================================');

const testData = {
  name: 'Тест Тестов',
  phone: '+7 912 345 67 89',
  messenger: 'telegram',
  service: 'Консультация по РВП',
  message: 'КРИТИЧЕСКИЙ ТЕСТ отправки заявки',
  urgentConsultation: false
};

console.log('📤 Отправляем запрос на:', 'https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7');
console.log('📦 Данные:', JSON.stringify(testData, null, 2));
console.log('⏰ Время:', new Date().toLocaleString('ru-RU'));
console.log('');

async function runCriticalTest() {
  try {
    const response = await fetch('https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('📊 РЕЗУЛЬТАТ:');
    console.log('Status:', response.status);
    console.log('StatusText:', response.statusText);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    const result = await response.json();
    console.log('Response Body:', JSON.stringify(result, null, 2));
    
    if (response.ok && result.success) {
      console.log('✅ ТЕСТ ПРОЙДЕН! EMAIL ОТПРАВЛЕН!');
    } else {
      console.log('❌ ТЕСТ НЕ ПРОЙДЕН! EMAIL НЕ ОТПРАВЛЕН!');
    }
    
    return { status: response.status, data: result };
  } catch (error) {
    console.error('❌ КРИТИЧЕСКАЯ ОШИБКА:', error.message);
    return { error: error.message };
  }
}

// Если fetch недоступен, используем альтернативный метод
if (typeof fetch === 'undefined') {
  console.log('⚠️ Fetch недоступен, используем Node.js https модуль');
  
  const https = await import('https');
  
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

  const req = https.request(options, (res) => {
    console.log('📊 РЕЗУЛЬТАТ:');
    console.log('Status:', res.statusCode);
    console.log('StatusText:', res.statusMessage);
    console.log('Headers:', res.headers);

    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Response Body:', data);
      try {
        const result = JSON.parse(data);
        if (res.statusCode === 200 && result.success) {
          console.log('✅ ТЕСТ ПРОЙДЕН! EMAIL ОТПРАВЛЕН!');
        } else {
          console.log('❌ ТЕСТ НЕ ПРОЙДЕН! EMAIL НЕ ОТПРАВЛЕН!');
        }
      } catch (e) {
        console.log('❌ Ошибка парсинга JSON:', e.message);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ КРИТИЧЕСКАЯ ОШИБКА:', error.message);
  });

  req.write(postData);
  req.end();
} else {
  await runCriticalTest();
}