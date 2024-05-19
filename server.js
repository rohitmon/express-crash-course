import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(logger);

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/posts', posts);

app.use(notFound)

app.use(errorHandler);

app.listen(port , () => {`Server is listening on port ${port}`});