const { spawn, execSync } = require('child_process');
const fs = require('fs');

async function runCommand(command, args = [], description) {
    console.log(`\n🔧 ${description}`);
    console.log(`📝 Команда: ${command} ${args.join(' ')}`);
    console.log('='.repeat(60));
    
    return new Promise((resolve) => {
        const process = spawn(command, args, {
            stdio: 'inherit',
            shell: true
        });
        
        process.on('close', (code) => {
            if (code === 0) {
                console.log('✅ Команда выполнена успешно');
                resolve(true);
            } else {
                console.log(`❌ Команда завершилась с кодом: ${code}`);
                resolve(false);
            }
        });
        
        process.on('error', (error) => {
            console.error(`❌ Ошибка запуска: ${error.message}`);
            resolve(false);
        });
    });
}

async function main() {
    console.log('🚀 ПОЛНОЕ ТЕСТИРОВАНИЕ TELEGRAM БОТА');
    console.log('===================================');
    console.log(`📅 Время начала: ${new Date().toLocaleString('ru-RU')}`);
    
    const tests = [
        ['node', ['direct-test.js'], 'Прямой HTTP тест с Node.js'],
        ['python3', ['test-telegram.py'], 'Python тест'],
        ['node', ['execute-python-test.js'], 'Выполнение через Python wrapper']
    ];
    
    let anySuccess = false;
    
    for (const [command, args, description] of tests) {
        const success = await runCommand(command, args, description);
        if (success) {
            anySuccess = true;
            console.log(`\n🎯 Успешный тест найден: ${description}`);
            break; // Прерываем после первого успешного теста
        }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 ИТОГОВЫЙ РЕЗУЛЬТАТ');
    console.log('='.repeat(60));
    
    if (anySuccess) {
        console.log('✅ ТЕСТИРОВАНИЕ ЗАВЕРШЕНО УСПЕШНО');
        console.log('📱 Проверьте Telegram чат на наличие тестового сообщения');
    } else {
        console.log('❌ ВСЕ ТЕСТЫ ЗАВЕРШИЛИСЬ НЕУДАЧНО');
        console.log('🔍 Возможные причины:');
        console.log('   - Отсутствие интернет-соединения');
        console.log('   - Неправильный URL функции');
        console.log('   - Проблемы с Telegram API');
        console.log('   - Отсутствие необходимых инструментов (Node.js, Python)');
    }
    
    console.log(`\n📅 Время завершения: ${new Date().toLocaleString('ru-RU')}`);
    console.log('\n🏁 ТЕСТИРОВАНИЕ ЗАВЕРШЕНО');
}

// Запускаем главную функцию
main().catch(error => {
    console.error('\n💥 Критическая ошибка:', error.message);
    process.exit(1);
});