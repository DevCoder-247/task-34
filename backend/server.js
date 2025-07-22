const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST']
}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB Connected to ${mongoose.connection.host}`))
  .catch(err => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => res.send('Backend Running'));

app.post('/submit', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`));