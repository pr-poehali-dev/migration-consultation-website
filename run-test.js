import { execSync } from 'child_process';

try {
  console.log('Запускаем test-email.js...\n');
  const output = execSync('node test-email.js', { 
    encoding: 'utf8',
    cwd: process.cwd()
  });
  console.log('Результат выполнения:');
  console.log(output);
} catch (error) {
  console.error('Ошибка при выполнении:', error.message);
  if (error.stdout) {
    console.log('STDOUT:', error.stdout);
  }
  if (error.stderr) {
    console.log('STDERR:', error.stderr);
  }
}