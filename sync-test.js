const { execSync } = require('child_process');

console.log('🚀 СИНХРОННОЕ ВЫПОЛНЕНИЕ ТЕСТА TELEGRAM БОТА');
console.log('===========================================');
console.log(`📅 ${new Date().toLocaleString('ru-RU')}\n`);

try {
    console.log('🔧 Выполнение прямого Node.js теста...');
    const output = execSync('node direct-test.js', { 
        encoding: 'utf8',
        stdio: 'pipe',
        timeout: 30000
    });
    
    console.log(output);
    console.log('\n✅ ТЕСТ ВЫПОЛНЕН УСПЕШНО!');
    
} catch (error) {
    console.error('❌ ОШИБКА ВЫПОЛНЕНИЯ ТЕСТА');
    console.error(`Код ошибки: ${error.status || 'неизвестен'}`);
    
    if (error.stdout) {
        console.log('\n📤 Вывод программы:');
        console.log(error.stdout);
    }
    
    if (error.stderr) {
        console.error('\n📤 Ошибки:');
        console.error(error.stderr);
    }
    
    console.log('\n📋 Дополнительная информация об ошибке:');
    console.log(`   Тип: ${error.constructor.name}`);
    console.log(`   Сообщение: ${error.message}`);
}

console.log('\n🏁 ЗАВЕРШЕНИЕ СИНХРОННОГО ТЕСТА');