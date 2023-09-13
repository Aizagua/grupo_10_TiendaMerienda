const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controller/api/productsAPIController');

//Rutas
//Listado de Productos
router.get('/', productsAPIController.list);
//Detalle de un Producto
router.get('/:id', productsAPIController.detail);
//Agregar un Producto
//router.post('/create', productsAPIController.create);
//Editar un Producto
//router.put('/update/:id', productsAPIController.update);
//Eliminar un Producto
//router.delete('/delete/:id', productsAPIController.destroy);

module.exports = router;