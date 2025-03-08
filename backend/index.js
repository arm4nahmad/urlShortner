import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import shortid from 'shortid';
// Importing the URL model
import URL from './models/URL.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Routes
app.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const urlCode = shortid.generate();
    const newUrl = new URL({ originalUrl, shortUrl: urlCode });
    await newUrl.save();
    res.json({ shortUrl: `http://localhost:5000/${urlCode}` });
});

app.get('/:code', async (req, res) => {
    const url = await URL.findOne({ shortUrl: req.params.code });
    if (url) {
        return res.redirect(url.originalUrl);
    }
    res.status(404).send('URL not found');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
