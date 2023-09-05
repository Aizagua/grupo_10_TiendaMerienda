let express = require ("express");
let userController = require ("../controller/userscontroller");
let router = express.Router();

let path = require('path');
const multer = require("multer");
const {body} = require('express-validator');
const logMiddleware = require("../middlewares/logMiddleware");
const { log } = require("console");
const logoutMiddleware = require("../middlewares/logoutMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const validacionesUsuario = require("../middlewares/validacionesUsuarios")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/user'))
    },
    filename: function (req, file, cb) {
      let imageName = Date.now() + path.extname(file.originalname)
      cb(null, imageName)
    }
  });

let uploadFile = multer({ storage: storage });

router.get ("/login", userController.loginUser);
router.post("/login", userController.loginProcess);

//Nuevo User

router.get ("/register", userController.registroUser);
router.post('/register', uploadFile.single('imagen'),validacionesUsuario, userController.processCreate)
//Editar USER
router.get('/users/edit/:id',logMiddleware, userController.edit);
router.put('/users/:id',logMiddleware, uploadFile.single('imagen'),userController.editProcess);

//Borrar USER
router.get('/users/delete/:id',logMiddleware, userController.delete);
router.delete('/users/:id',logMiddleware, uploadFile.single('imagen'),userController.deleteProcess);

//lista de USERS
router.get ("/usersList",logMiddleware, userController.list);

//Perfil USER
router.get ("/perfil",logMiddleware, userController.perfilUser);
router.get('/perfil/:id',adminMiddleware, userController.perfilUserdetalle); //poner middleware adminMidleware cuando este listo logMiddleware
router.get('/logout', userController.logout);



module.exports = router;