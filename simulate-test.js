// Симуляция выполнения test-email.js
console.log('🔧 Симуляция выполнения теста отправки email\n');

// Показываем что будет отправлено
const testData = {
  name: 'Тест Тестов',
  phone: '+7 912 345 67 89',
  messenger: 'telegram',
  service: 'Консультация по РВП',
  message: 'Тестовое сообщение',
  urgentConsultation: false
};

console.log('📤 Данные для отправки:');
console.log(JSON.stringify(testData, null, 2));

console.log('\n🌐 URL endpoint:');
console.log('https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7');

console.log('\n📋 HTTP запрос:');
console.log('Method: POST');
console.log('Content-Type: application/json');

console.log('\n⚠️  Для фактического выполнения запустите:');
console.log('node test-email-simple.js');

// Проверяем доступность fetch API
console.log('\n🔍 Проверка среды выполнения:');
console.log('Node.js версия:', process.version);
console.log('Поддержка fetch:', typeof fetch !== 'undefined' ? 'Да' : 'Нет');

if (typeof fetch === 'undefined') {
  console.log('\n💡 Рекомендация: Используйте Node.js v18+ для встроенной поддержки fetch');
  console.log('   Или установите node-fetch: npm install node-fetch');
}

export {};