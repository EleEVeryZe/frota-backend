import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import morganMiddleware from '@/infra/adapters/rest_api/middlewares/morgan.middleware';
import errorHandler from '@/infra/adapters/rest_api/middlewares/errorHandler';
import { notFoundHandler } from '@/infra/adapters/rest_api/middlewares/notFoundHandler';
import router from '@/infra/adapters/rest_api/routes/index';
const app: Express = express();

// Logging
app.use(morganMiddleware);

// Security & Performance
app.use(helmet());
app.use(compression());
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 100,
		standardHeaders: true,
	}),
);

// CORS
app.use(
	cors({
		origin: process.env.CLIENT_URL || 'http://localhost:3000',
		credentials: true,
	}),
);

// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', router);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
