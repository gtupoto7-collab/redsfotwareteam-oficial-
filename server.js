const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// НАСТРОЙКА НА CLOUDINARY (Замени тези 3 реда с твоите реални ключове от Cloudinary профила ти)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'TVOIA_CLOUD_NAME',
    api_key: process.env.CLOUDINARY_API_KEY || 'TVOIA_API_KEY',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'TVOIA_API_SECRET'
});

// Настройка на Multer да праща файловете директно в Cloudinary облака
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'red-software-uploads',
        resource_type: 'auto', // Поддържа автоматично снимки и видеа
    },
});
const upload = multer({ storage: storage });

// Създаване на папка за SQLite базата данни
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)){
    fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'projects.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Грешка при връзка с базата данни:', err.message);
    } else {
        console.log('Svyazan s SQLite bazata danni v papka /database.');
    }
});

// Създаване на таблицата
db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    filename TEXT,
    filetype TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// API за качване на снимка или видео в Cloudinary
app.post('/api/upload', upload.single('mediaFile'), (req, res) => {
    const { title } = req.body;
    if (!req.file) {
        return res.status(400).json({ error: 'Няма качен файл.' });
    }

    const fileUrl = req.file.path; // Пълният защитен линк от Cloudinary облака
    const filetype = req.file.mimetype.startsWith('video') ? 'video' : 'image';

    const query = `INSERT INTO projects (title, filename, filetype) VALUES (?, ?, ?)`;
    db.run(query, [title || 'Без заглавие', fileUrl, filetype], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Грешка при запис в базата.' });
        }
        res.json({ success: true, id: this.lastID, fileUrl, filetype });
    });
});

// API за четене на проектите
app.get('/api/projects', (req, res) => {
    db.all(`SELECT * FROM projects ORDER BY id DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Грешка при четене.' });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Serveryt raboti na port ${PORT}`);
});
