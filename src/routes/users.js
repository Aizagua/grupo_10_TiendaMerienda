let express = require ("express");
let userController = require ("../controller/userscontroller");
let router = express.Router();

router.get ("/registro", userController.registroUser);
router.get ("/login", userController.loginUser);
module.exports = router;