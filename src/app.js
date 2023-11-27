import express from 'express';
import {conn} from './db.js';
import {PORT} from './config.js';

const app = express();

app.get('/', async (req, res) => {
    res.send('api desplegada');
})

app.get('/ping', async (req, res) => {
    
    const result = await conn.query('select * from tbUsuarios ')
       res.json(result[0])
       console.log(result[0])
       
})

app.post('/insert', async (req, res) => {
    const { nombre, apellido, email } = req.body;
    try {
        const result = await conn.query('INSERT INTO tbUsuarios (nombre, apellido, email) VALUES (?, ?, ?)', [nombre, apellido, email]);
        res.send('User added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding user to database');
    }
});


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
