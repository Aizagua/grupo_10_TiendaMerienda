let express = require ("express");
let path = require('path')
const products = require("../controller/productsController");
const multer = require("multer")
let router = express.Router();
const logMiddleware = require("../middlewares/logMiddleware")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: function (req, file, cb) {
      let imageName = Date.now() + path.extname(file.originalname)
      cb(null, imageName)
    }
  })
let uploadFile = multer({ storage: storage });


//Detalle
router.get('/detail/:id', products.detalle);

//Crear Producto
router.get('/products/create',logMiddleware, products.create)
router.post('/products', uploadFile.single('imagen'), products.processCreate)

//Editar Producto
router.get('/products/edit/:id',logMiddleware,products.edit)
router.put('/products/:id', uploadFile.single('imagen'),products.editProcess)

//Borrar Producto
router.get('/products/delete/:id',logMiddleware,products.delete)
router.delete('/products/:id', products.deleteProcess)

router.get ("/productList", products.list);

module.exports = router;