#!/usr/bin/env bun

// Тест Telegram бота с использованием встроенного fetch в Bun
console.log('🤖 Тестирование Telegram бота');
console.log('🔧 Используется: Bun runtime');

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

console.log('\n📤 Отправляем тестовые данные:');
console.log(JSON.stringify(testData, null, 2));
console.log('\n⏳ Выполняется запрос...\n');

try {
  const response = await fetch('https://functions.poehali.dev/a9299a8a-df29-4247-808f-4903c8fb7c42', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData)
  });

  console.log(`✅ HTTP статус: ${response.status} ${response.statusText}`);
  
  // Получаем и показываем заголовки ответа
  console.log('\n📋 Заголовки ответа:');
  for (const [key, value] of response.headers.entries()) {
    console.log(`   ${key}: ${value}`);
  }
  
  const result = await response.text();
  console.log('\n📨 Тело ответа:');
  
  try {
    const jsonResult = JSON.parse(result);
    console.log(JSON.stringify(jsonResult, null, 2));
  } catch (e) {
    console.log('Ответ не в формате JSON:');
    console.log(`"${result}"`);
  }

  console.log('\n📊 Анализ результата:');
  if (response.ok) {
    console.log('✅ Статус: УСПЕХ (HTTP 2xx)');
    console.log('📱 Telegram уведомление должно быть отправлено');
    console.log('🔍 Проверьте Telegram чат на наличие нового сообщения');
  } else {
    console.log('❌ Статус: ОШИБКА');
    console.log(`   HTTP код: ${response.status}`);
    console.log(`   Описание: ${response.statusText}`);
  }

} catch (error) {
  console.error('\n❌ Произошла ошибка при выполнении запроса:');
  console.error(`   Тип ошибки: ${error.constructor.name}`);
  console.error(`   Сообщение: ${error.message}`);
  
  if (error.cause) {
    console.error(`   Причина: ${error.cause}`);
  }
  
  console.log('\n📊 Результат: ПРОВАЛ - сетевая ошибка');
}

console.log('\n🏁 Тест завершен');