import express from 'express';
import {conn} from './db.js';
import {PORT} from './config.js';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('api desplegada');
})

app.post('/insert/usuarios', async (req, res) => {
    const { usuario, clave, nombre, apellido, correo } = req.body;
    try {
        const result = await conn.query('INSERT INTO tbUsuarios (Usuario, Clave, Nombre, Apellido, Correo) VALUES (?, ?, ?, ?, ?)', [usuario, clave, nombre, apellido, correo]);
        res.send('User added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding user to database');
    }
});


app.post('/insert/muebles', async (req, res) => {
    const { Nombre, Descripcion, Precio, Estado, Stock, idFotos, idCategoria, idColor, idMaterial } = req.body;
    try {
        const result = await conn.query('INSERT INTO tbMuebles (Nombre, Descripcion, Precio, Estado, Stock, idFotos, idCategoria, idColor, idMaterial) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [Nombre, Descripcion, Precio, Estado, Stock, idFotos, idCategoria, idColor, idMaterial]);
        res.send('Mueble agregado exitosamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar mueble a la base de datos');
    }
});


app.get('/ping', async (req, res) => {
    const result = await conn.query('select * from tbUsuarios ')
       res.json(result[0])
       console.log(result[0])
       
})

app.get('/check-connection', async (req, res) => {
    
    try {
        const result = await conn.query('SELECT 1');
        res.send('Connection successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error connecting to database');
    }
});


 app.listen(PORT)
 console.log('server on port', PORT)
