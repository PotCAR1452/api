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
        const result = await conn.query('SELECT * FROM MostrarMuebles');
        
        // Configurar los encabezados CORS en la respuesta
        res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // O "*" para permitir cualquier origen
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        // Enviar la respuesta
        res.json(result[0]);
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});


router.get('/g/mostrarcategoria', async (req, res) => {
    try {
         res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // O "*" para permitir cualquier origen
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const result = await conn.query('select * from vwCategorias')
        res.json(result[0])
        console.log(result)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
})

router.get('/g/mostrarMateriales', async (req, res) => {
    try {
         res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // O "*" para permitir cualquier origen
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const result = await conn.query('select * from vwMateriales')
        res.json(result[0])
        console.log(result)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
})

router.get('/g/mostrarcolores', async (req, res) => {
    try {
         res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // O "*" para permitir cualquier origen
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const result = await conn.query('select * from vwColores')
        res.json(result[0])
        console.log(result)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
})


//consultas para parte de modal de visualizacion de la informacion de los muebles

router.get('/g/mostrarmuebleid', async (req, res) => {
    try {
        const [idmueble] = req.body;
        res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // O "*" para permitir cualquier origen
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const result = await conn.query('call ObtenerInformacionMuebleid(?)', [idmueble]);
        res.json(result[0]);
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

router.get('/g/mostrarfotomueble', async (req, res) => {
    try {
        const [idmueble] = req.body;
        res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // O "*" para permitir cualquier origen
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const result = await conn.query('call ObtenerFotosMuebleid(?)', [idmueble]);
        res.json(result[0]);
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});



export default router;
