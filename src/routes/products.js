let express = require ("express");
const products = require("../controller/productsController");
let router = express.Router();

router.get ("/productDetail", products.detail);
router.get ("/productCreation", products.creation);
router.get ("/productList", products.list);

module.exports = router;