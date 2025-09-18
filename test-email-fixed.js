// Полифилл для fetch в случае старой версии Node.js
if (typeof fetch === 'undefined') {
  try {
    const { default: fetch, Headers, Request, Response } = await import('node-fetch');
    global.fetch = fetch;
    global.Headers = Headers;
    global.Request = Request;
    global.Response = Response;
  } catch (error) {
    console.error('Fetch не поддерживается. Установите node-fetch или используйте Node.js v18+');
    process.exit(1);
  }
}

// Тестируем отправку заявки
const testEmailFunction = async () => {
  try {
    console.log('Отправляем тестовую заявку...');
    
    const response = await fetch('https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Тест Тестов',
        phone: '+7 912 345 67 89',
        messenger: 'telegram',
        service: 'Консультация по РВП',
        message: 'Тестовое сообщение',
        urgentConsultation: false
      })
    });

    console.log('Статус ответа:', response.status);
    console.log('Статус текст:', response.statusText);
    
    const result = await response.json();
    console.log('Ответ сервера:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ Тест пройден успешно!');
    } else {
      console.log('❌ Тест завершился с ошибкой');
    }
    
    return result;
  } catch (error) {
    console.error('❌ Ошибка при отправке запроса:', error.message);
    console.error('Полная ошибка:', error);
    return { error: error.message };
  }
};

// Запускаем тест
console.log('🔧 Тестирование backend функции отправки email');
console.log('📧 URL:', 'https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7');
console.log('');

testEmailFunction()
  .then(() => {
    console.log('\n🔚 Тест завершен');
  })
  .catch((error) => {
    console.error('\n💥 Критическая ошибка:', error);
  });