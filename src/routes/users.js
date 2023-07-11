let express = require ("express");
let userController = require ("../controller/userscontroller");
let router = express.Router();

let path = require('path');
const multer = require("multer");


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
//Nuevo User
router.get ("/registro", userController.registroUser);
router.post('/registro', uploadFile.single('imagen'), userController.processCreate)

//Editar USER
router.get('/users/edit/:id', userController.edit);
router.put('/users/:id', uploadFile.single('imagen'),userController.editProcess);

//Borrar USER
router.get('/users/delete/:id', userController.delete);
router.delete('/users/:id', uploadFile.single('imagen'),userController.deleteProcess);

//Perfil USER
router.get ("/users/perfil/:id", userController.perfilUser);

module.exports = router;