import express from 'express';
import {conn} from './db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('api desplegada');
});

router.get('/ping', async (req, res) => {
    const result = await conn.query('select * from tbUsuarios ')
       res.json(result[0])
       console.log(result)
})


//vista para pantalla principal muebles de la semana
router.get('/g/vwMueblessemana', async (req, res) => {
    try {
        const result = await conn.query('select * from vwMueblesConFoto')
        res.json(result[0])
        console.log(result)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
})


//vista para mostrar los mueble en la pagina de tienda 
router.get('/g/MostrarMuebles', async (req, res) => {
    try {
        const result = await conn.query('select * from MostrarMuebles')
        res.json(result[0])
        console.log(result)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
})




export default router;