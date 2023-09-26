let express = require ("express");
const contactoController = require("../controller/contactoController");
let router = express.Router();

const logMiddleware = require("../middlewares/logMiddleware")
router.get ("/contacto", contactoController.send);

module.exports = router;