import { nanoid } from 'nanoid';
import { pool } from '../db/index.js';
import { isValidUrl } from '../utils/validateUrls.js';
import { checkSecurity } from '../utils/checkSecurity.js';

export const shortenUrl = async (req, res) => {
    const {longUrl, length = 6} = req.body;

    if(!longUrl || !isValidUrl(longUrl)) {
        return res.status(400).json({message: "Invalid URL"});
    }

    const securityScore = checkSecurity(longUrl);

    if(securityScore < 30) {
        return res.status(400).json({message: 'URL appears too risky', securityScore });
    }

    const shortId = nanoid(length);

    try {
        const insertQuery = `
         INSERT INTO urls (long_url, short_id, user_id)
         VALUES ($1, $2, $3)
         RETURNING *;
        `;

        const userId = req.user?.id || null;

        const result = await pool.query(insertQuery, [longUrl, shortId, userId]);

        res.status(201).json({
            message: "URL Shortened Successfully",
            shortUrl: `${req.protocol}://${req.get('host')}/s/${shortId}`,
            securityScore,
            data: result.rows[0],
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
};

export const redirectToLongUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const query = `SELECT * FROM urls WHERE short_id = $1`;
    const result = await pool.query(query, [shortId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'URL not found' });
    }

    const longUrl = result.rows[0].long_url;

    // Optional: update click count
    await pool.query(`UPDATE urls SET clicks = clicks + 1 WHERE short_id = $1`, [shortId]);

    res.redirect(longUrl);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserUrls = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM urls WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.status(200).json({ urls: result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


export const countUrls = async (req, res) => {
    try {
    const result = await pool.query('SELECT COUNT(*) FROM urls');
    const count = result.rows[0].count;
    res.json({ total: parseInt(count) + 100});
  } catch (err) {
    console.error('Error fetching total URL count:', err);
    res.status(500).json({ error: 'Server error' });
  }
}