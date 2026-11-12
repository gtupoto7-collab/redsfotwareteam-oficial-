const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Увеличаваме лимита на JSON тялото до 20MB за снимки и видеа
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Връзка с MongoDB Atlas в облака
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Atlas е свързан успешно!'))
    .catch(err => console.error('Грешка при връзка с MongoDB:', err));
}

// Схема за съхранение на услугите и проектите
const ProjectSchema = new mongoose.Schema({
    title: String,
    tag: String,
    description: String,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', ProjectSchema);

// API GET: Вземи всички проекти от облака
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Грешка при четене от базата данни' });
    }
});

// API POST: Запиши нов проект от админ панела
app.post('/api/projects', async (req, res) => {
    try {
        const { title, tag, description, imageUrl } = req.body;
        const newProject = new Project({
            title: title || 'Нова услуга',
            tag: tag || '50 €',
            description: description || '',
            imageUrl: imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f2495?w=600&auto=format&fit=crop&q=60'
        });
        await newProject.save();
        res.json({ success: true, message: 'Записано успешно в облака!' });
    } catch (err) {
        console.error('Грешка при Mongoose save:', err);
        res.status(500).json({ error: 'Грешка при запис в базата данни' });
    }
});

// Сервиране на статични файлове (index.html и др.)
app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сървърът работи на порт ${PORT}`);
});
