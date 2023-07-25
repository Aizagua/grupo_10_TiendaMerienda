let express = require ("express");
const carritoController = require("../controller/carritoController");
let router = express.Router();
const logMiddleware = require("../middlewares/logMiddleware")
router.get ("/carrito",logMiddleware, carritoController.send);

module.exports = router;