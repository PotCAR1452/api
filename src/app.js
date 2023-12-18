import express from 'express';
import cors from 'cors';
import { conn } from './db.js';
import { PORT } from './config.js';
import getRouter from './getRouters.js';
import postRouter from './postRoutes.js';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/', getRouter);
app.use('/crud', postRouter);

app.get('/', async (req, res) => {
    res.send('Hello World');
});

app.get('/ping', async (req, res) => {
    const result = await conn.query('select * from tbUsuarios ')
    res.json(result[0]);
    console.log(result);
});

app.get('/check-connection', async (req, res) => {
    try {
        const result = await conn.query('SELECT 1');
        res.json({ status: 'success', message: 'Conexión exitosa' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error en la conexión a la base de datos' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
    conn.end();
    process.exit();
});
