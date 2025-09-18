console.log('Node.js версия:', process.version);
console.log('Поддержка fetch:', typeof fetch !== 'undefined' ? 'Да' : 'Нет');

// Если fetch не поддерживается, попробуем импортировать node-fetch
if (typeof fetch === 'undefined') {
  console.log('Пытаемся импортировать node-fetch...');
  try {
    const { default: fetch } = await import('node-fetch');
    global.fetch = fetch;
    console.log('node-fetch успешно импортирован');
  } catch (error) {
    console.log('node-fetch недоступен:', error.message);
  }
}

// Теперь запускаем тест email
console.log('\n--- Запуск теста email ---\n');

const testEmailFunction = async () => {
  try {
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

    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', result);
    
    return result;
  } catch (error) {
    console.error('Error:', error);
    return { error: error.message };
  }
};

await testEmailFunction();