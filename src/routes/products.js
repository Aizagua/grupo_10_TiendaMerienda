let express = require ("express");
let path = require('path')
const products = require("../controller/productsController");
let router = express.Router();
const logMiddleware = require("../middlewares/logMiddleware");
const validacionesProducto = require('../middlewares/validacionesProducto')
const multerMiddleware = require ('../middlewares/multer')

//Detalle
router.get('/detail/:id', products.detalle);
router.get('/detail/:id',logMiddleware, products.detalle);

//Crear Producto
router.get('/products/create',logMiddleware, products.create)
router.post('/products', multerMiddleware.single('imagen'), validacionesProducto, products.processCreate)

//Editar Producto
router.get('/products/edit/:id',logMiddleware,products.edit)
router.get('/products/edit',logMiddleware,products.mostrarProducto)
router.put('/products/:id', multerMiddleware.single('imagen'), products.editProcess)

//Borrar Producto
router.get('/products/delete/:id',logMiddleware,products.delete)
router.delete('/products/:id', products.deleteProcess)

router.get ("/productList", products.list);

module.exports = router;