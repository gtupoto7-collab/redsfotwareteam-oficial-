const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 43242;

const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');
const DATA_FILE = path.join(__dirname, 'database.json');

if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

let db = { projects: [], orders: [] };
if (fs.existsSync(DATA_FILE)) {
    try { db = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch (e) {}
}
function saveDB() { fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf8'); }

app.get('/api/projects', (req, res) => {
    res.json(db.projects || []);
});

app.post('/api/upload', upload.single('mediaFile'), (req, res) => {
    try {
        const { title } = req.body;
        if (!req.file) return res.json({ success: false, error: 'Няма качен файл!' });
        
        const filetype = req.file.mimetype.startsWith('video') ? 'video' : 'image';
        const filename = `/uploads/${req.file.filename}`;

        db.projects.unshift({ title, filename, filetype, date: new Date().toLocaleString() });
        saveDB();

        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => console.log(`[RED TEAM SERVER RUNNING] http://localhost:${PORT}`));
