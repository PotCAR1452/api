import express from 'express';
import {conn} from './db.js';
const router = express.Router();


//consultas registro usuarios
//verifica estado de usuario
router.post('/p/VerificarDuplicado', async (req, res) => {
    const { user } = req.body;
    try {
        const result = await conn.query('CALL VerificarDuplicado (?)', [user]);
        res.send(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error verificar duplicado');
    }
});

//inesrtar usuario
router.post('/p/spInsertarUsuario', async (req, res) => {
    const { Usuario, Clave, Nombre, Apellido, correo } = req.body;
    try {
        const result = await conn.query('CALL spInsertarUsuario (?,?,?,?,?)', [Usuario, Clave, Nombre, Apellido, correo]);
        res.send(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al ingresar usuario');
    }
});


//autorizar usuario
router.post('/p/AutenticarUsuario', async (req, res) => {
    const { Usuario, Clave } = req.body;
    try {
        const result = await conn.query('CALL SP_AutenticarUsuario (?,?)', [Usuario, Clave]);
        res.send(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error al autenticar usuario`);
    }
});


//es para saccar el numero de muebles que tiene un usuario dependiendo 
//del id es decir el usuario id = 1 tiene 3 muebles en el carro
router.post('/p/ValidarCarrito', async (req, res) => {
    const { p_idusuario} = req.body;
    try {
        const result = await conn.query(' CALL SP_ValidarCarrito (?);', [p_idusuario]);
        res.send(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error al sacar datos carrito`);
    }
});


//para insertar muebles en el carrito con su cantidad idmueble y idusuario
router.post('/p/spInsertarCarrito', async (req, res) => {
    const { p_idusuario,id_mueble,cantidad} = req.body;
    try {
        const result = await conn.query(' CALL spInsertarCarrito (?,?,?);', [p_idusuario,id_mueble,cantidad]);
        res.send(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error al agregar al carrito`);
    }
});

//para eliminar muebles en el carrito con su cantidad idmueble y idusuario
router.delete('/p/spInsertarCarrito', async (req, res) => {
    const { p_idusuario,id_mueble} = req.body;
    try {
        const result = await conn.query('CALL spEliminarCarrito (?,?);', [p_idusuario,id_mueble]);
        res.send(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error al eliminar mueble`);
    }
});


//para actualizar la cantidad de muebles en el carrito con su cantidad idmueble y idusuario

router.delete('/p/EliminarMueble', async (req, res) => {
    const { id_mueble} = req.body;
    try {
        const result = await conn.query('CALL EliminarMueble (?);', [id_mueble]);
        res.send(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error al eliminar mueble`);
    }
});

//------------------------------------------------------------------------------------
 //consultas para administrador
 
 //consultas para insertar muebles
router.post('/p/InsertarMuebles', async (req, res) => {
    const { Nombre, Descripcion, Precio, Estado, Stock, idFotos, idCategoria, idColor, idMaterial } = req.body;
    try {
        const result = await conn.query('Call InsertarMuebles (?,?,?,?,?,?,?,?,?)', [Nombre, Descripcion, Precio, Estado, Stock, idFotos, idCategoria, idColor, idMaterial]);
        res.send('Mueble agregado exitosamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding mueble to database');
    }
});

//consultas para actualizar inf del muebles

router.put('/p/ActualizarMueble', async (req, res) => {
    const { Nombre, Descripcion, Precio, Estado, Stock, idFotos, idCategoria, idColor, idMaterial } = req.body;
    try {
        const result = await conn.query('Call ActualizarMueble (?,?,?,?,?,?,?,?,?)', [Nombre, Descripcion, Precio, Estado, Stock, idFotos, idCategoria, idColor, idMaterial]);
        res.send('Mueble agregado exitosamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding mueble to database');
    }
});

//consultas para actualizar inf del muebles





export default router;