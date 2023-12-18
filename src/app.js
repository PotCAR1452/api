import express from 'express';
import { conn } from './db.js';
import getRouter from './getRouters.js'; // Importa el enrutador getRouter.js
import postRouter from './postRoutes.js'; // Importa el enrutador postRouter.js
import { PORT } from './config.js';
import cors from 'cors'; 

const app = express();

// Middleware para analizar JSON en solicitudes POST
app.use(express.json());

// Asocia los enrutadores a las rutas
app.use('/', getRouter);
app.use('/crud', postRouter);

// Ruta raíz
app.get('/', async (req, res) => {
    res.send('Hello World');
});

// Ruta de ping para comprobar la conexión
app.get('/ping', async (req, res) => {
    const result = await conn.query('select * from tbUsuarios ')
    res.json(result[0]);
    console.log(result);
});

// Ruta para comprobar la conexión a la base de datos
app.get('/check-connection', async (req, res) => {
    try {
        const result = await conn.query('SELECT 1');
        res.send('coneccion exitosa');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error coneccion a la base de datos');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
