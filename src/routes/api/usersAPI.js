const express = require('express');
const router = express.Router();
const usersAPIController = require ('../../controller/api/usersApiController')

//Rutas
//Listado de Usuario
router.get('/', usersAPIController.list);
//Detalle de un Usuario
router.get('/:id', usersAPIController.detail);
//Agregar un Usuario
//router.post('/create', usersAPIController.create);
//Editar un Usuario
//router.put('/update/:id', usersAPIController.update);
//Eliminar un Usuario
//router.delete('/delete/:id', usersAPIController.destroy);

module.exports = router;