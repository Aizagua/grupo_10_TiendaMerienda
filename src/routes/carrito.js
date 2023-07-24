let express = require ("express");
const carritoController = require("../controller/carritoController");
let router = express.Router();
const logMiddelware = require("../../middlewares/logMiddleware")
router.get ("/carrito",logMiddelware, carritoController.send);

module.exports = router;