import express from 'express';
import {conn} from './db.js'

const app = express();

app.get('/', async (req, res) => {
    
    res.send('Hello World');
})

app.get('/ping', async (req, res) => {

    const result = await conn.query('select "hello" as Result')
       res.json(result)
       console.log('ping')
       
})

 app.listen(3000)
 console.log('server on port', 3000)