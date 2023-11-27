import express from 'express';
import {conn} from './db.js'


const app = express();

app.get('/', async (_, res) => {
    res.send('Hello World');
});

app.get('/ping', async (_, res) => {
    try {
        const result = await conn.query('select "hello" as Result');
        res.json(result);
        console.log('ping');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

app.get('/g/vwMueblessemana', async (_, res) => {
    try {
        const result = await conn.query('select * from vwMueblesConFoto');
        res.json(result[0]);
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

app.get('/g/MostrarMuebles', async (_, res) => {
    try {
        const result = await conn.query('select * from MostrarMuebles');
        res.json(result[0]);
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

app.listen(3000);
console.log('server on port', 3000);
