const fs = require('fs');
const path = require('path');
const rutaArchivo = path.resolve('./src/database/users.json');
const userUsers = JSON.parse(fs.readFileSync(rutaArchivo));
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const userlogMiddleware = require ('../middlewares/userLogMiddleware')
const db = require('../database/models');
const sequelize = db.sequelize;

let registrocontroller = {
    registroUser: function (req, res) {
      res.render("../views/users/formRegistro")
    },

    perfilUser:(req,res)=>{
      const buscarUsuario = userUsers.find(row=>row.id==req.session.usuarioLogeado.id)
      if (buscarUsuario) return res.render('users/perfilUser', {user: buscarUsuario})
              else return res.send("ERROR 404 NOT FOUND")
    },

    loginUser: function (req,res) {
      res.render("../views/users/login")
    },

    loginProcess: function (req, res){
      console.log(userUsers)
      console.log(req.body)
      const usuario = userUsers.find((row) => row.email == req.body.email);
      console.log(usuario)
        if (usuario) {
          let ClaveOK = bcryptjs.compareSync(req.body.password, usuario.password);
            console.log("usuario encontrado")
            if (ClaveOK){
                delete usuario.password
                req.session.usuarioLogeado = usuario
                console.log("session creada")
                console.log(req.session.usuarioLogeado)
                res.redirect("/perfil")
    }else{console.log("contraseña incorrecta")
    res.redirect("/login")}
    }},

    edit: (req,res)=>{
      const buscarUsuario = userUsers.find(row=>row.id==req.params.id)
      if (buscarUsuario) return res.render('users/edicionUser', {user: buscarUsuario})
              else return res.send("ERROR 404 NOT FOUND")
    },
    processCreate: (req, res) => {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length>0){
        return res.render('users/formRegistro',{
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }
      let ultimoUser = userUsers.slice(-1)
      let idUser = ultimoUser[0].id
      let userNew = {
          "id": idUser+1, 
          "nombre": req.body.nombre,
          "apellido": req.body.apellido,
          "celular": req.body.celular,
          "email": req.body.email,
          //"imagen": req.file.filename,
          "password": bcryptjs.hashSync(req.body.password,10),
          "admin": false
          }
          if (req.file == undefined){  userNew.imagen = "default.png"} 
          else {   userNew.imagen = req.file.filename  }
         
        
        fs.writeFileSync(rutaArchivo, JSON.stringify([...userUsers, userNew], null, 2), "utf-8")
        return res.redirect("/")
      },
    editProcess:(req,res)=>{
      let editarUsuario = {}
      editarUsuario = userUsers.find(row => row.id == req.params.id)
      editarUsuario.nombre = req.body.nombre
      editarUsuario.apellido = req.body.apellido 
      editarUsuario.celular = req.body.celular 
      editarUsuario.correo = req.body.correo
      editarUsuario.password = req.body.password
      //editarUsuario.imagen = req.file.filename  
      if (req.file == undefined){  editarUsuario.imagen = editarUsuario.imagen} 
      else {   editarUsuario.imagen = req.file.filename  }
     
      fs.writeFileSync(rutaArchivo, JSON.stringify(userUsers, null, 2), "utf-8") 
        return res.redirect("/")
          
    },

    list: function (req, res) {
      res.render('users/listadoDeUsers', {listaUsuarios: userUsers})
  },
    delete: (req,res)=>{
      const buscarUsuario = userUsers.find(row=>row.id==req.params.id)
      if (buscarUsuario) return res.render('users/borrarUser', {user: buscarUsuario})
              else return res.send("ERROR 404 NOT FOUND")
    },
    deleteProcess: (req,res)=>{
      function encontrarId(item) { 
        return item.id == req.params.id;
      }
      const index = userUsers.findIndex(encontrarId)
      if (index != -1) {
        userUsers.splice(index, 1);
        fs.writeFileSync(rutaArchivo, JSON.stringify(userUsers, null, 2), "utf-8")
        return res.redirect("/")
      }else{
        return res.render("Error en el borrado")
      }
      
    },
    logout: (req,res)=>{
      req.session.destroy()
        return res.redirect('/');
    }    
};


module.exports = registrocontroller
