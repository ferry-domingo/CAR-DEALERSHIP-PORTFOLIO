import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { bootstrapAdmin } from './utils/bootstrapAdmin.js';

const app = express();
const port = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

app.disable('x-powered-by');
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: clientUrl.split(',').map((x) => x.trim()), credentials: false }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(mongoSanitize());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use('/uploads', express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'uploads'), { fallthrough: false, maxAge: '7d' }));

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'Rafael Galvez portfolio demo API' }));
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(bootstrapAdmin)
  .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
  .catch((error) => {
    console.error('Unable to start server:', error.message);
    process.exit(1);
  });
