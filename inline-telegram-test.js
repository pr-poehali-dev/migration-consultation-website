const { execSync } = require('child_process');

// Выполняем команду напрямую как если бы пользователь ввел ее в терминал
console.log('🚀 ИМИТАЦИЯ ВЫПОЛНЕНИЯ: node test-telegram.js');
console.log('='.repeat(60));
console.log('📅 Время:', new Date().toLocaleString('ru-RU'));
console.log('');

try {
    // Выполняем основной тест
    const result = execSync('node final-test-runner.js', {
        encoding: 'utf8',
        stdio: 'pipe',
        timeout: 60000,
        maxBuffer: 1024 * 1024
    });
    
    console.log(result);
    
} catch (error) {
    // Показываем все, что удалось получить
    if (error.stdout) {
        console.log('📤 ВЫВОД ПРОГРАММЫ:');
        console.log(error.stdout);
    }
    
    if (error.stderr) {
        console.log('\n📤 ОШИБКИ:');
        console.log(error.stderr);
    }
    
    console.log('\n📊 ИНФОРМАЦИЯ ОБ ОШИБКЕ:');
    console.log(`   Код завершения: ${error.status}`);
    console.log(`   Сигнал: ${error.signal || 'нет'}`);
    console.log(`   Тип ошибки: ${error.constructor.name}`);
    
    if (error.killed) {
        console.log('   ⚠️  Процесс был принудительно завершен');
    }
    
    if (error.status !== 0 && error.status !== null) {
        console.log(`   ❌ Тест завершился с кодом ошибки: ${error.status}`);
    }
}

console.log('\n🏁 ВЫПОЛНЕНИЕ КОМАНДЫ ЗАВЕРШЕНО');