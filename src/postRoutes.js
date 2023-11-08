import express from 'express';
import {conn} from './db.js';
const router = express.Router();

router.post('/insert/usuarios', async (req, res) => {
    const { usuario, clave, nombre, apellido, correo } = req.body;
    try {
        const result = await conn.query('INSERT INTO tbUsuarios (Usuario, Clave, Nombre, Apellido, Correo) VALUES (?, ?, ?, ?, ?)', [usuario, clave, nombre, apellido, correo]);
        res.send('User added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding user to database');
    }
});

router.post('/insert/muebles', async (req, res) => {
    const { Nombre, Descripcion, Precio, Estado, Stock, idFotos, idCategoria, idColor, idMaterial } = req.body;
    try {
        const result = await conn.query('INSERT INTO tbMuebles (Nombre, Descripcion, Precio, Estado, Stock, idFotos, idCategoria, idColor, idMaterial) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [Nombre, Descripcion, Precio, Estado, Stock, idFotos, idCategoria, idColor, idMaterial]);
        res.send('Mueble agregado exitosamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding mueble to database');
    }
});

export default router;