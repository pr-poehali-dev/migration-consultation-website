const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Выполнение Python теста Telegram бота');
console.log('========================================');

try {
    // Проверяем наличие Python
    console.log('🔍 Проверка наличия Python...');
    const pythonVersion = execSync('python3 --version', { encoding: 'utf8' });
    console.log(`✅ Найден: ${pythonVersion.trim()}`);
    
    console.log('\n🐍 Запуск Python теста...\n');
    
    // Выполняем Python тест
    const output = execSync('python3 test-telegram.py', { 
        encoding: 'utf8',
        stdio: 'pipe'
    });
    
    console.log(output);
    console.log('✅ Python тест выполнен успешно!');
    
} catch (error) {
    console.error('❌ Ошибка при выполнении Python теста:');
    console.error(`Код ошибки: ${error.status}`);
    
    if (error.stdout) {
        console.log('\n📤 STDOUT:');
        console.log(error.stdout);
    }
    
    if (error.stderr) {
        console.error('\n📤 STDERR:');
        console.error(error.stderr);
    }
    
    // Если Python не найден, пробуем альтернативные способы
    if (error.message.includes('python3') && error.message.includes('not found')) {
        console.log('\n🔧 Python 3 не найден. Пробуем альтернативы...');
        
        try {
            console.log('🌐 Пробуем curl...');
            const curlOutput = execSync('curl --version', { encoding: 'utf8' });
            console.log(`✅ Curl доступен: ${curlOutput.split('\n')[0]}`);
            
            console.log('\n🌐 Выполнение curl теста...');
            const curlTest = execSync('bash curl-telegram-test.sh', { 
                encoding: 'utf8',
                stdio: 'pipe'
            });
            console.log(curlTest);
            console.log('✅ Curl тест выполнен!');
            
        } catch (curlError) {
            console.error('❌ Curl также не доступен');
            
            // Последняя попытка - JavaScript тест
            try {
                console.log('\n🟢 Пробуем Node.js тест...');
                const nodeOutput = execSync('node test-telegram.js', { 
                    encoding: 'utf8',
                    stdio: 'pipe'
                });
                console.log(nodeOutput);
                console.log('✅ Node.js тест выполнен!');
                
            } catch (nodeError) {
                console.error('❌ Node.js тест также завершился с ошибкой');
                console.error('🔍 Проверьте доступность инструментов разработки');
            }
        }
    }
}

console.log('\n🏁 Завершение выполнения теста');