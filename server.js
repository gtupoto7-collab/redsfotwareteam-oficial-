const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Handling logo.jpg request for Open Graph / Social Sharing
    if (req.url === '/logo.jpg') {
        const logoPath = path.join(__dirname, 'logo.jpg');
        fs.readFile(logoPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Logo not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data);
            }
        });
        return;
    }

    // Serving the main platform index.html
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error: index.html missing');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`RED SOFTWARE TEAM server is running on port ${PORT}`);
});
