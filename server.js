const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            // Fallback to index.html for SPA / single page routes
            fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading index.html');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(data, 'utf-8');
                }
            });
        } else {
            let ext = path.extname(filePath);
            let contentType = 'text/html; charset=utf-8';
            if (ext === '.css') contentType = 'text/css';
            if (ext === '.js') contentType = 'text/javascript';
            if (ext === '.png') contentType = 'image/png';
            if (ext === '.jpg') contentType = 'image/jpeg';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`RED SOFTWARE TEAM server is running live on port ${PORT}`);
});
