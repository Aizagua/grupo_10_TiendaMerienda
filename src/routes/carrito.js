let express = require ("express");
const carritoController = require("../controller/carritoController");
let router = express.Router();

router.get ("/carrito", carritoController.send);

module.exports = router;