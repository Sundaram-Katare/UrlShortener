import express from 'express';
import { shortenUrl, redirectToLongUrl, getUserUrls, countUrls } from '../controllers/urlControllers.js';
import { protect, protectOptional } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public shorten (token optional)
router.post('/shorten', protectOptional, shortenUrl);

// Redirect
router.get('/s/:shortId', redirectToLongUrl);

// User dashboard
router.get('/user', protect, getUserUrls);

router.get('/count', countUrls);

export default router;