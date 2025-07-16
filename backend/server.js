const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const User = require('./models/User');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log('MongoDB Connected');
    console.log(`the db is connected with ${mongoose.connection.host}:${mongoose.connection.port}`);
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.send("Welcomw to backend");
})

app.post('/submit', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({
            name, 
            email,
            password
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${process.envPORT}`);
});

