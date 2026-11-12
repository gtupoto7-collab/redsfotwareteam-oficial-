const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Речник с разширенията и техните Content-Type заголовки
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    // Пречистване на URL адреса за сигурност
    let safeUrl = req.url.split('?')[0];
    if (safeUrl === '/') {
        safeUrl = '/index.html';
    }

    const filePath = path.join(__dirname, safeUrl);
    const extname = path.extname(filePath).toLowerCase();

    // Проверяваме дали файлът съществува в директорията
    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
            // Намираме правилния Content-Type или задаваме по подразбиране
            const contentType = MIME_TYPES[extname] || 'application/octet-stream';
            
            fs.readFile(filePath, (readErr, data) => {
                if (readErr) {
                    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('Грешка в сървъра при четене на файла');
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);
                }
            });
        } else {
            // Ако файлът не е намерен, зареждаме index.html (за SPA маршрутизация или грешка)
            const indexPath = path.join(__dirname, 'index.html');
            fs.readFile(indexPath, (indexErr, indexData) => {
                if (indexErr) {
                    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('404 - Страницата или файлът не са намерени');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(indexData);
                }
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`RED-SOFTWARE-ENGINEERING-TEAM-BG сървърът работи на порт ${PORT}`);
});
