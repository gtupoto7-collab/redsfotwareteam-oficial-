const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// Vruska kum MongoDB Atlas v oblaka
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Atlas e svyazan uspeshno!'))
    .catch(err => console.error('Greshka pri vruska s MongoDB:', err));
}

// Shema za proektite i snimkite
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

    // API: Vzemi vsichki proekti ot oblaka za vsichki ustroistva
    if (safeUrl === '/api/projects' && req.method === 'GET') {
        try {
            const projects = await Project.find().sort({ createdAt: -1 });
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(projects));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Greshka pri chetene na proektite' }));
        }
        return;
    }

    // API: Zapiši nov proekt i snimka ot panela direktno v oblaka
    if (safeUrl === '/api/projects' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const newProject = new Project({
                    title: data.title || 'Nova usruga',
                    tag: data.tag || '50 €',
                    description: data.description || '',
                    imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f2495?w=600&auto=format&fit=crop&q=60'
                });
                await newProject.save(); // Zapisva se v MongoDB Atlas zavinagi!
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: true, message: 'Zapisano v oblaka!' }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Greshka pri zapis' }));
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
                    res.end('Greshka v survura');
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
                    res.end('404 - Not Found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(indexData);
                }
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`RED-SOFTWARE-TEAM-BG survurat raboti na port ${PORT}`);
});
