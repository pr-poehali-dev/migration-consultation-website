const { execSync } = require('child_process');

function executeCommand(command, description) {
  console.log(`\n🔧 ${description}`);
  console.log(`📝 Команда: ${command}`);
  console.log('=' * 50);
  
  try {
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      timeout: 30000
    });
    console.log(output);
    console.log('✅ Команда выполнена успешно\n');
    return true;
  } catch (error) {
    console.error(`❌ Ошибка выполнения: ${error.message}`);
    if (error.stdout) {
      console.log('📤 STDOUT:');
      console.log(error.stdout);
    }
    if (error.stderr) {
      console.error('📤 STDERR:');
      console.error(error.stderr);
    }
    console.log('❌ Команда завершилась с ошибкой\n');
    return false;
  }
}

console.log('🚀 Запуск тестирования Telegram бота');
console.log('📅 Время:', new Date().toLocaleString('ru-RU'));

// Пробуем разные способы выполнения
const attempts = [
  ['bun simple-telegram-test.js', 'Выполнение с Bun runtime'],
  ['node simple-telegram-test.js', 'Выполнение с Node.js'],
  ['node test-telegram.js', 'Выполнение основного теста с Node.js']
];

let success = false;
for (const [command, description] of attempts) {
  if (executeCommand(command, description)) {
    success = true;
    break;
  }
}

if (!success) {
  console.log('\n❌ Все попытки выполнения не удались');
  console.log('🔍 Проверьте наличие Node.js или Bun в системе');
} else {
  console.log('\n✅ Тест успешно выполнен');
}

console.log('\n🏁 Завершение работы скрипта');