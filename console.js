// RED SOFTWARE TEAM - Административна Конзола v1.0
// Този скрипт е предназначен за управление на платформата през терминал.
// Изисква: Node.js, fs (file system), readline (за интерактивен input)

const fs = require('fs');
const readline = require('readline');

// --- КОНФИГУРАЦИЯ ---
const DATA_FILE = 'rst_data.json';
const PORT = process.env.PORT || 3000;
const ADMIN_USER = 'admin123';
const ADMIN_PASS = '123456';

// --- ИНИЦИАЛИЗАЦИЯ НА ДАННИТЕ ---
let platformData = {
    serverStatus: '🟢 Online (Render Ohio)',
    visitors: 745,
    orders: [],
    projects: []
};

// Зареждане на данните, ако файла съществува
if (fs.existsSync(DATA_FILE)) {
    try {
        const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
        platformData = JSON.parse(rawData);
    } catch (e) {
        console.error('Грешка при зареждане на данни. Стартирам с дефолтни.');
    }
} else {
    // Създаване на файл с дефолтни данни при първо стартиране
    saveData();
}

function saveData() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(platformData, null, 2));
}

// --- ИНТЕРАКТИВЕН ИНТЕРФЕЙС ---
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'RED-SOFTWARE-TEAM-SVR > '
});

let isAdminLoggedIn = false;

console.log('========================================');
console.log('   RED SOFTWARE TEAM - Admin Console');
console.log('========================================');
console.log('Login required. Type /login <user> <pass>');
console.log('Or type /help for available commands.');
console.log('========================================');

rl.prompt();

rl.on('line', (line) => {
    const command = line.trim();
    if (!command) {
        rl.prompt();
        return;
    }

    const parts = command.split(' ');
    const cmd = parts[0];

    if (cmd === '/login') {
        handleLogin(parts[1], parts[2]);
    } else if (cmd === '/exit') {
        console.log('Изход от конзолата. Довиждане, шефе!');
        process.exit(0);
    } else if (!isAdminLoggedIn) {
        console.log('Първо трябва да се логнете с /login <user> <pass>');
    } else {
        // Админ команди
        switch (cmd) {
            case '/help':
                showHelp();
                break;
            case '/status':
                showStatus();
                break;
            case '/orders':
                showOrders();
                break;
            case '/projects':
                showProjects();
                break;
            case '/addproject':
                addProject(parts.slice(1).join(' ')); // Очаква формат: Title|Link|Badge|Desc
                break;
            case '/delproject':
                deleteProject(parseInt(parts[1])); // Очаква Index
                break;
            case '/clearorders':
                clearOrders();
                break;
            case '/simulatevisitor':
                simulateVisitor();
                break;
            default:
                console.log(`Непозната команда: ${cmd}. Въведете /help за списък.`);
                break;
        }
    }

    rl.prompt();
}).on('close', () => {
    console.log('Конзолата е затворена.');
    process.exit(0);
});

// --- ФУНКЦИИ ЗА ЛОГИН ---
function handleLogin(user, pass) {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        isAdminLoggedIn = true;
        console.log('🟢 Успешен вход! Добре дошли, шефе.');
        platformData.visitors++; // Симулираме посещение при вход
        saveData();
    } else {
        console.log('🔴 Грешно потребителско име или парола!');
    }
}

// --- ПОМОЩНИ ФУНКЦИИ ---
function showHelp() {
    console.log('--- НАЛИЧНИ КОМАНДИ ---');
    console.log('/help         - Показва това меню');
    console.log('/status       - Показва статус на системата (визити, сървър)');
    console.log('/orders       - Показва входящите заявки');
    console.log('/projects     - Показва проектите в портфолиото');
    console.log('/addproject "Title|Link|Badge|Desc" - Добавя проект');
    console.log('/delproject <index>   - Изтрива проект по индекс');
    console.log('/clearorders  - Изтрива всички заявки');
    console.log('/simulatevisitor - Симулира ново посещение');
    console.log('/exit         - Изход от конзолата');
}

function showStatus() {
    console.log('--- СТАТУС НА СИСТЕМАТА ---');
    console.log(`Server Status: ${platformData.serverStatus}`);
    console.log(`Total Visitors: ${platformData.visitors}`);
    console.log(`Total Orders:   ${platformData.orders.length}`);
    console.log(`Total Projects: ${platformData.projects.length}`);
    console.log('========================================');
}

function showOrders() {
    console.log('--- ВХОДЕЩИ ЗАЯВКИ ---');
    if (platformData.orders.length === 0) {
        console.log('📥 Няма получени заявки.');
    } else {
        platformData.orders.forEach((order, index) => {
            console.log(`[${index}] Date: ${order.date}`);
            console.log(`    Name:    ${order.name}`);
            console.log(`    Phone:   ${order.phone}`);
            console.log(`    Service: ${order.service}`);
            console.log(`    Details: ${order.notes}`);
            console.log('----------------------------------------');
        });
    }
    console.log('========================================');
}

function showProjects() {
    console.log('--- ПОРТФОЛИО МОДЕЛИ ---');
    if (platformData.projects.length === 0) {
        console.log('📂 Няма качени проекти.');
    } else {
        platformData.projects.forEach((proj, index) => {
            console.log(`[${index}] Title: ${proj.title}`);
            console.log(`    Link:  ${proj.link}`);
            console.log(`    Badge: ${proj.badge}`);
            console.log(`    Desc:  ${proj.desc}`);
            console.log('----------------------------------------');
        });
    }
    console.log('========================================');
}

function addProject(params) {
    if (!params) {
        console.log('🔴 Грешен формат. Използвайте: /addproject "Title|Link|Badge|Desc"');
        return;
    }
    const [title, link, badge, desc] = params.split('|');
    if (!title || !link || !badge || !desc) {
        console.log('🔴 Грешен формат. Всички полета (Title|Link|Badge|Desc) са задължителни.');
        return;
    }

    const newProj = { title, link, badge, desc };
    platformData.projects.push(newProj);
    saveData();
    console.log(`🟢 Проектът "${title}" е добавен успешно в портфолиото.`);
}

function deleteProject(index) {
    if (isNaN(index) || index < 0 || index >= platformData.projects.length) {
        console.log('🔴 Невалиден индекс на проект.');
        return;
    }
    const removed = platformData.projects.splice(index, 1);
    saveData();
    console.log(`🟢 Проектът "${removed[0].title}" е изтрит успешно.`);
}

function clearOrders() {
    if (platformData.orders.length === 0) {
        console.log('📥 Няма какво да се изтрива (списъкът е празен).');
        return;
    }
    platformData.orders = [];
    saveData();
    console.log('🗑️ Списъкът със заявки е изчистен.');
}

function simulateVisitor() {
    platformData.visitors++;
    saveData();
    console.log(`👁️‍🗨️ Симулирано ново посещение. Общи визити: ${platformData.visitors}`);
}

// --- ЕКСПОРТ НА ДАННИТЕ КЪМ JSON ФАЙЛ, КОЙТО СЪРВЪРЪТ ЧЕТЕ ---
// Тази функция трябва да се извиква от server.js за да показва реалните поръчки на сайта.
module.exports = {
    getPlatformData: () => platformData,
    addOrder: (order) => {
        platformData.orders.unshift(order); // Добавя най-новата най-отгоре
        saveData();
    }
};
