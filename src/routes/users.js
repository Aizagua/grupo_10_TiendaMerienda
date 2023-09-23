let express = require ("express");
let userController = require ("../controller/userscontroller");
let router = express.Router();
let path = require('path');
const logMiddleware = require("../middlewares/logMiddleware");
const { log } = require("console");
const logoutMiddleware = require("../middlewares/logoutMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const validacionesUsuario = require("../middlewares/validacionesUsuarios");
const validacionesEditUsuario = require("../middlewares/validacionesEditUsuarios");
const adminBlockeadeMiddleware = require("../middlewares/adminBlockeadeMiddleware");
const uploadFile = require ("../middlewares/multerUser")


router.get ("/login", userController.loginUser);
router.post("/login", userController.loginProcess);

//Nuevo User

router.get ("/register", userController.registroUser);
router.post('/register', uploadFile.single('imagen'),validacionesUsuario, userController.processCreate)
//Editar USER
router.get('/users/edit/:id',logMiddleware, userController.edit);
router.put('/users/:id',logMiddleware, uploadFile.single('imagen'),validacionesEditUsuario,userController.editProcess);

//Borrar USER
router.get('/users/delete/:id',logMiddleware, userController.delete);
router.delete('/users/:id',logMiddleware, uploadFile.single('imagen'),userController.deleteProcess);

//lista de USERS
router.get ("/usersList",logMiddleware,adminBlockeadeMiddleware, userController.list);

//Perfil USER
router.get ("/perfil",logMiddleware, userController.perfilUser);
router.get('/perfil/:id',logMiddleware,adminBlockeadeMiddleware, userController.perfilUserdetalle); //poner middleware adminMidleware cuando este listo logMiddleware
router.get('/logout', userController.logout);



module.exports = router;