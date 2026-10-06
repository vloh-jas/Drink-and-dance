import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Proxy for TheCocktailDB Non-Alcoholic drinks
  app.get('/api/cocktails/non-alcoholic', async (req, res) => {
    try {
      const cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';
      const response = await fetch(cocktailUrl);
      if (!response.ok) {
        throw new Error(`TheCocktailDB returned ${response.status}`);
      }
      const data = await response.json();
      return res.json(data);
    } catch (err: any) {
      console.error('Error fetching non-alcoholic cocktails:', err);
      return res.status(500).json({ error: err.message || 'Failed to fetch non-alcoholic cocktails' });
    }
  });

  // Proxy for Ticketmaster Discovery API — upcoming music events in Singapore.
  // Keeps TICKETMASTER_API_KEY on the server.
  app.get('/api/concerts/singapore', async (req, res) => {
    const apiKey = process.env.TICKETMASTER_API_KEY;
    if (!apiKey || apiKey === '<ticketmaster_apikey>') {
      return res.status(503).json({ error: 'TICKETMASTER_API_KEY is not configured' });
    }
    try {
      const params = new URLSearchParams({
        apikey: apiKey,
        countryCode: 'SG',
        classificationName: 'music',
        sort: 'date,asc',
        size: String(Math.min(Number(req.query.size) || 50, 200)),
        locale: '*',
      });
      if (typeof req.query.keyword === 'string' && req.query.keyword.trim()) {
        params.set('keyword', req.query.keyword.trim());
      }
      const ticketmasterUrl = `https://app.ticketmaster.com/discovery/v2/events.json?${params}`;
      const response = await fetch(ticketmasterUrl);
      if (!response.ok) {
        throw new Error(`Ticketmaster returned ${response.status}`);
      }
      const data = await response.json();
      return res.json({ events: data._embedded?.events ?? [] });
    } catch (err: any) {
      console.error('Error fetching Ticketmaster events:', err);
      return res.status(502).json({ error: err.message || 'Failed to fetch Ticketmaster events' });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
