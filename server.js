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

// Shema za 28-te uslugi i proekti
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

    // API: Vzemi vsichki 28+ uslugi i proekti ot oblaka
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
