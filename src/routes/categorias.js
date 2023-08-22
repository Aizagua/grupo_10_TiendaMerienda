const express = require('express');
const router = express.Router();
const path = require('path')
const categorias = require('../controller/categoriasController');
const logMiddleware = require("../middlewares/logMiddleware");

router.get('/categorias', categorias.list);

//Crear Categoria
router.get('/categorias/create',logMiddleware, categorias.create)
router.post('/categorias', categorias.processCreate)


module.exports = router;