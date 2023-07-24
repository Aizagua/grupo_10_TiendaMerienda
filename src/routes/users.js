let express = require ("express");
let userController = require ("../controller/userscontroller");
let router = express.Router();

let path = require('path');
const multer = require("multer");
const {body} = require('express-validator');
const logMiddelware = require("../../middlewares/logMiddleware");
const { log } = require("console");


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

const validations = [
          body("nombre").notEmpty().withMessage('Debe completar su nombre'),
          body("apellido").notEmpty().withMessage('Debe completar su apellido'),
          body("celular").notEmpty().withMessage('Debe completar su celular'),
          body("email").notEmpty().withMessage('Debe completar su email'),
          body("password").notEmpty().withMessage('Debe completar su Clave'),
]

router.get ("/register", userController.registroUser);
router.post('/register', uploadFile.single('imagen'),validations, userController.processCreate)
//Editar USER
router.get('/users/edit/:id',logMiddelware, userController.edit);
router.put('/users/:id',logMiddelware, uploadFile.single('imagen'),userController.editProcess);

//Borrar USER
router.get('/users/delete/:id',logMiddelware, userController.delete);
router.delete('/users/:id',logMiddelware, uploadFile.single('imagen'),userController.deleteProcess);

//Perfil USER
router.get ("/users/perfil/:id",logMiddelware, userController.perfilUser);

module.exports = router;