let express = require ("express");
let path = require('path')
const products = require("../controller/productsController");
let router = express.Router();
const logMiddleware = require("../middlewares/logMiddleware");
const validacionesProducto = require('../middlewares/validacionesProducto')
const multerMiddleware = require ('../middlewares/multer')
const adminBlockeadeMiddleware = require("../middlewares/adminBlockeadeMiddleware");
const validacionesEditProducto = require('../middlewares/validacionesEditProducto')

//Detalle
router.get('/detail/:id', products.detalle);
router.get('/detail/:id',logMiddleware,adminBlockeadeMiddleware,products.detalle);

//Crear Producto
router.get('/products/create', adminBlockeadeMiddleware, products.add);
router.post('/products', multerMiddleware.single('imagen'), validacionesProducto, products.processCreate)

//Editar Producto
router.get('/products/edit/:id', adminBlockeadeMiddleware, products.edit)
router.get('/products/edit', adminBlockeadeMiddleware,products.mostrarProducto)
router.put('/products/:id', adminBlockeadeMiddleware, multerMiddleware.single('imagen'), validacionesEditProducto, products.editProcess)

//Borrar Producto
router.get('/products/delete/:id',logMiddleware,products.delete)
router.delete('/products/:id',adminBlockeadeMiddleware, products.deleteProcess)

router.get ("/productList", products.list);

module.exports = router;