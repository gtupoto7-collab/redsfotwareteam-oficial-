const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// Vryzka s MongoDB Atlas v oblaka za vechno pazene
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Atlas e svyrzan uspeshno!'))
    .catch(err => console.error('Greshka pri vryzka s MongoDB:', err));
}

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
    '.webp': 'image/webp'
};

const server = http.createServer(async (req, res) => {
    let safeUrl = req.url.split('?')[0];

    // API: Vzemi vsichki proekti ot oblaka
    if (safeUrl === '/api/projects' && req.method === 'GET') {
        try {
            const projects = await Project.find().sort({ createdAt: -1 });
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(projects));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Greshka pri chetene' }));
        }
        return;
    }

    // API: Zapishi nov proekt/snimka ot admin panela v oblaka
    if (safeUrl === '/api/projects' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const newProject = new Project({
                    title: data.title || 'Nova usluga',
                    tag: data.tag || '50 €',
                    description: data.description || '',
                    imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f2495?w=600&auto=format&fit=crop&q=60'
                });
                await newProject.save();
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: true, message: 'Zapisano v oblaka!' }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Greshka pri zapis' }));
            }
        });
        return;
    }

    if (safeUrl === '/') safeUrl = '/index.html';
    const filePath = path.join(__dirname, safeUrl);
    const extname = path.extname(filePath).toLowerCase();

    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
            fs.readFile(filePath, (readErr, data) => {
                res.writeHead(200, { 'Content-Type': MIME_TYPES[extname] || 'application/octet-stream' });
                res.end(data);
            });
        } else {
            fs.readFile(path.join(__dirname, 'index.html'), (indexErr, indexData) => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(indexData);
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server raboti na port ${PORT}`);
});
