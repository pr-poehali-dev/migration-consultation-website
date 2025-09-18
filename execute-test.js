// Выполнение test-email-simple.js
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Запуск теста backend функции отправки email');
console.log('📝 Команда: node test-email-simple.js');
console.log('⏰ Время запуска:', new Date().toLocaleString('ru-RU'));
console.log('=' .repeat(60));

try {
  // Проверяем существование файла
  if (!fs.existsSync('./test-email-simple.js')) {
    console.error('❌ Файл test-email-simple.js не найден!');
    process.exit(1);
  }

  console.log('✅ Файл test-email-simple.js найден');
  console.log('🔄 Выполняем тест...\n');

  // Выполняем тест
  const output = execSync('node test-email-simple.js', {
    encoding: 'utf8',
    stdio: 'pipe',
    timeout: 30000 // 30 секунд таймаут
  });

  console.log('📊 РЕЗУЛЬТАТ ВЫПОЛНЕНИЯ:');
  console.log('-' .repeat(40));
  console.log(output);
  console.log('-' .repeat(40));
  console.log('✅ Тест выполнен успешно!');

} catch (error) {
  console.error('❌ ОШИБКА ПРИ ВЫПОЛНЕНИИ ТЕСТА:');
  console.error('Код ошибки:', error.status || 'неизвестен');
  
  if (error.stdout) {
    console.log('\n📤 STDOUT:');
    console.log(error.stdout);
  }
  
  if (error.stderr) {
    console.error('\n📥 STDERR:');
    console.error(error.stderr);
  }
  
  if (error.message) {
    console.error('\n💬 Сообщение об ошибке:');
    console.error(error.message);
  }
}

console.log('\n⏰ Время завершения:', new Date().toLocaleString('ru-RU'));