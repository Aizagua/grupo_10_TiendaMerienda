let express = require ("express");
const historiaController = require("../controller/historiaController");
let router = express.Router();

const logMiddleware = require("../middlewares/logMiddleware")
router.get ("/historia", historiaController.send);

module.exports = router;