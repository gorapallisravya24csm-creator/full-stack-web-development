const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eventdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const Event = mongoose.model('Event', new mongoose.Schema({
  title: String, date: Date, venue: String, description: String,
  capacity: Number, registered: { type: Number, default: 0 }
}));

const Registration = mongoose.model('Registration', new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  name: String, rollNo: String, email: String,
  status: { type: String, default: 'Registered' }
}, { timestamps: true }));

// All upcoming events
app.get('/api/events', async (req, res) => {
  res.json(await Event.find().sort({ date: 1 }));
});

// Event details
app.get('/api/events/:id', async (req, res) => {
  res.json(await Event.findById(req.params.id));
});

// Add event
app.post('/api/events', async (req, res) => {
  res.json(await Event.create(req.body));
});

// Register student
app.post('/api/events/:id/register', async (req, res) => {
  const { name, rollNo, email } = req.body;
  if (!name || !rollNo || !email) return res.status(400).json({ message: 'All fields required' });

  const dup = await Registration.findOne({ event: req.params.id, rollNo });
  if (dup) return res.status(400).json({ message: 'Already registered' });

  const ev = await Event.findOneAndUpdate(
    { _id: req.params.id, $expr: { $lt: ['$registered', '$capacity'] } },
    { $inc: { registered: 1 } }, { new: true }
  );
  if (!ev) return res.status(400).json({ message: 'Event is full' });

  await Registration.create({ event: req.params.id, name, rollNo, email });
  res.json({ message: 'Registration successful' });
});

// Participant list + search
app.get('/api/events/:id/participants', async (req, res) => {
  const s = req.query.search || '';
  const rx = new RegExp(s, 'i');
  res.json(await Registration.find({
    event: req.params.id, $or: [{ name: rx }, { rollNo: rx }]
  }));
});

// Sample data (browser lo open cheyyi once)
app.get('/api/seed', async (req, res) => {
  if (await Event.countDocuments() === 0) {
    await Event.insertMany([
      { title: 'AI Workshop', date: '2026-10-25', venue: 'Seminar Hall', description: 'Intro to AI and ML', capacity: 100 },
      { title: 'Web Dev Seminar', date: '2026-10-28', venue: 'Lab 3', description: 'React and Node basics', capacity: 60 },
      { title: 'Hackathon', date: '2026-11-02', venue: 'Main Auditorium', description: '24 hour hackathon', capacity: 150 }
    ]);
  }
  res.send('Seeded');
});

app.listen(5000, () => console.log('Server on 5000'));