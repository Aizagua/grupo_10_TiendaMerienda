let express = require ("express");
const products = require("../controller/productsController");
let router = express.Router();

//Detalle
router.get('/detalle/:id', products.detalle);

//Crear Producto
router.get('/crear/producto', products.create)
router.post('/products', products.processCreate)





router.get ("/productList", products.list);

module.exports = router;