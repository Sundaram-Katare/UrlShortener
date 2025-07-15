import express from 'express';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/url', urlRoutes);
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("URL Shortener Backend is running");
});

export default app;