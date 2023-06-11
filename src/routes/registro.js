let express = require ("express");
let registrocontroller = require ("../controller/registrocontroller");
let router = express.Router();

router.get ("/registro", registrocontroller.send);

module.exports = router;