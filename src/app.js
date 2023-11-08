import express from 'express';
import {PORT} from './config.js';

import getRoutes from './getRouters.js';
import postRoutes from './postRoutes.js';
import putRoutes from './putRoutes.js';

const app = express();

app.use(express.json());
app.use(getRoutes);
app.use(postRoutes);
app.use(putRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});