const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// Връзка с MongoDB Atlas в облака
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Atlas е свързан успешно!'))
    .catch(err => console.error('Грешка при връзка с MongoDB:', err));
}

// Схема за съхранение на услугите и проектите в облака
const ProjectSchema = new mongoose.Schema({
    title: String,
    tag: String,
    description: String,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', ProjectSchema);

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

const server = http.createServer(async (req, res) => {
    let safeUrl = req.url.split('?')[0];

    // 1. API GET: Вземи всички проекти/услуги от облака
    if (safeUrl === '/api/projects' && req.method === 'GET') {
        try {
            const projects = await Project.find().sort({ createdAt: -1 });
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(projects));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Грешка при четене от базата данни' }));
        }
        return;
    }

    // 2. API POST: Запиши нов проект/услуга от админ панела в облака
    if (safeUrl === '/api/projects' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const newProject = new Project({
                    title: data.title || 'Нова услуга',
                    tag: data.tag || '50 €',
                    description: data.description || '',
                    imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f2495?w=600&auto=format&fit=crop&q=60'
                });
                await newProject.save();
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: true, message: 'Записано успешно в облака!' }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Грешка при запис в базата данни' }));
            }
        });
        return;
    }

    if (safeUrl === '/') {
        safeUrl = '/index.html';
    }

    const filePath = path.join(__dirname, safeUrl);
    const extname = path.extname(filePath).toLowerCase();

    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
            const contentType = MIME_TYPES[extname] || 'application/octet-stream';
            fs.readFile(filePath, (readErr, data) => {
                if (readErr) {
                    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('Грешка при четене на файла');
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);
                }
            });
        } else {
            const indexPath = path.join(__dirname, 'index.html');
            fs.readFile(indexPath, (indexErr, indexData) => {
                if (indexErr) {
                    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('404 - Страницата не е намерена');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(indexData);
                }
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`Сървърът на Red Software Team работи на порт ${PORT}`);
});
