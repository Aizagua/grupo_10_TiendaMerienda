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
    perfilUserdetalle:(req,res)=>{

      const buscarUsuario = userUsers.find(row=>row.id==req.params.id)
      if (buscarUsuario) return res.render('users/perfilUser', {user: buscarUsuario})
              else return res.send("ERROR 404 NOT FOUND")
    },
    loginUser: function (req,res) {
      res.render("../views/users/login")
    },

    loginProcess: async (req,res) => {
      const usuario = await db.Usuarios.findOne({
          where: {
            email: req.body.email
          }});
        console.log(usuario);      
        try{
          if (usuario) {
            let ClaveOK = bcryptjs.compareSync(req.body.password, usuario.password);
              if (ClaveOK== true){
                  delete usuario.password
                  req.session.usuarioLogeado = usuario
                  res.redirect("/perfil")
              } else{console.log("contraseña incorrecta")}
        } else{
        res.redirect("/login")}
        } catch (error) {
          console.log("Error :",error)
        }},

    edit: (req,res)=>{
      const buscarUsuario = userUsers.find(row=>row.id==req.params.id)
      if (buscarUsuario) return res.render('users/edicionUser', {user: buscarUsuario})
              else return res.send("ERROR 404 NOT FOUND")
    },
    processCreate: async (req, res) => {
       const resultValidation = validationResult(req);
      if (resultValidation.errors.length>0){
        return res.render('users/formRegistro',{
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }else{
      try{
          await db.Usuarios.create({
          "nombre": req.body.nombre,
          "apellido": req.body.apellido,
          "celular": req.body.celular,
          "email": req.body.email,
          "imagen": req.file ? req.file.filename : "default.png",
          "password": bcryptjs.hashSync(req.body.password,10),
          "admin": false
          })
      } catch (error) {
        console.log("Error :",error)
      }}
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

    list: (req, res) =>{
      db.Usuarios.findAll()
      .then(usuarios => {
        res.render('users/listadoDeUsers', {listaUsuarios: usuarios})
      })
      .catch(error => {
          console.error( error);

      });
      
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
