import express from 'express';
import {conn} from './db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('api desplegada');
});

router.get('/ping', async (req, res) => {
    const result = await conn.query('select * from tbUsuarios ')
       res.json(result)
       console.log(result)
})

export default router;