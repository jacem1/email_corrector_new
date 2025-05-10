const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const correctEmailWithAI = require('./functions/correctEmail'); // Import the function

const app = express();
const port = process.env.PORT || 3000;

// Store admin credentials from environment variables
const adminUsername = process.env.ADMIN_USERNAME; // Access the username
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH; // Access the hashed password

// Store history in memory (in a real application, you'd use a database)
let history = [];

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Route for the email correction function
app.post('/correctEmail', async (req, res) => {
    const { text } = req.body;
    try {
        const correctedText = await correctEmailWithAI(text);
        // Add to history
        history.push({
            originalText: text,
            correctedText,
            timestamp: new Date()
        });
        res.json({ correctedText });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get history endpoint
app.get('/getHistory', (req, res) => {
    res.json(history);
});

// Delete history item endpoint
app.post('/deleteHistory', (req, res) => {
    const { index } = req.body;
    if (index >= 0 && index < history.length) {
        history.splice(index, 1);
        res.json({ success: true });
    } else {
        res.status(400).json({ error: 'Invalid index' });
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check credentials bcrypt.compareSync(password, adminPasswordHash)
    if (username === adminUsername && password === adminPasswordHash) {
        // Authentication successful
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
