let express = require ("express");
let path = require('path')
const products = require("../controller/productsController");
const multer = require("multer")
let router = express.Router();

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
router.get('/detalle/:id', products.detalle);

//Crear Producto
router.get('/crear/producto', products.create)
router.post('/products', uploadFile.single('imagen'), products.processCreate)





router.get ("/productList", products.list);

module.exports = router;