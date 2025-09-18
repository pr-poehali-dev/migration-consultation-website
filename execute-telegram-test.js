const { spawn } = require('child_process');

console.log('🚀 Запуск теста Telegram бота...\n');

const nodeProcess = spawn('node', ['test-telegram.js'], {
  stdio: 'pipe',
  shell: true
});

let output = '';
let errorOutput = '';

nodeProcess.stdout.on('data', (data) => {
  const text = data.toString();
  output += text;
  process.stdout.write(text);
});

nodeProcess.stderr.on('data', (data) => {
  const text = data.toString();
  errorOutput += text;
  process.stderr.write(text);
});

nodeProcess.on('close', (code) => {
  console.log(`\n📊 Процесс завершен с кодом: ${code}`);
  
  console.log('\n📋 Полный вывод:');
  console.log('================');
  console.log(output);
  
  if (errorOutput) {
    console.log('\n❌ Ошибки:');
    console.log('================');
    console.log(errorOutput);
  }
  
  console.log('\n🏁 Тест завершен');
});