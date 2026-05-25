const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
// REPLACE with your actual InfinityFree website URL
app.use(cors({ origin: 'https://your-website.infinityfreeapp.com' })); 
app.use(express.json());

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        const chatCompletion = await groq.chat.completions.create({
            "messages": [{ "role": "user", "content": userMessage }],
            "model": "llama-3.3-70b-versatile", // Or use "llama-3.1-8b-instant"
        });

        res.json({ reply: chatCompletion.choices[0]?.message?.content });
    } catch (error) {
        console.error("Groq Error:", error);
        res.status(500).json({ error: "Failed to fetch AI response" });
    }
});

app.listen(3000, () => console.log('Server running!'));