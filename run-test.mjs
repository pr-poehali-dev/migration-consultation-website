import { spawn } from 'child_process';

console.log('Запуск test-email-simple.js...\n');

const child = spawn('node', ['test-email-simple.js'], {
  stdio: 'pipe',
  encoding: 'utf8'
});

child.stdout.on('data', (data) => {
  process.stdout.write(data);
});

child.stderr.on('data', (data) => {
  process.stderr.write(data);
});

child.on('close', (code) => {
  console.log(`\nПроцесс завершен с кодом ${code}`);
});

child.on('error', (error) => {
  console.error('Ошибка запуска:', error);
});