const mongoose = require('mongoose');

// Автоматична връзка с облачната база данни
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB свързан успешно!'))
.err(err => console.error('Грешка при връзка с MongoDB:', err));

// Създаване на схема за проектите/офертите
const ProjectSchema = new mongoose.Schema({
  title: String,
  tag: String,
  description: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', ProjectSchema);

// АВТОМАТИЧЕН ENDPOINT ЗА ЗАПИСВАНЕ
app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project({
      title: req.body.title,
      tag: req.body.tag,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    });
    await newProject.save(); // Записва се автоматично в облака!
    res.json({ success: true, message: 'Проектът е качен и запазен завинаги!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// АВТОМАТИЧЕН ENDPOINT ЗА ЧЕТЕНЕ НА ВСИЧКИ УСТРОЙСТВА
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects); // Връща проектите към лаптопа и телефона в реално време
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
