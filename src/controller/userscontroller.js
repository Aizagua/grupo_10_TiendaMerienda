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

    perfilUser:async (req,res)=>{
      const buscarUsuario = await db.Usuarios.findByPk(req.session.usuarioLogeado.id)
      try{
        if (buscarUsuario) {
          return res.render('users/perfilUser', {user: buscarUsuario})
        } }
    catch{
      return res.send("ERROR 404 NOT FOUND")
    }
    },    
             
    perfilUserdetalle:async (req,res)=>{
      const buscarUsuario = await db.Usuarios.findByPk(req.params.id)
      try{
        if (buscarUsuario) {
          return res.render('users/perfilUser', {user: buscarUsuario})
        } }
    catch{
      return res.send("ERROR 404 NOT FOUND")
    }
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
        try {
          if (usuario) {
            let ClaveOK = bcryptjs.compareSync(req.body.password, usuario.password);
            console.log(usuario.password)
              if (ClaveOK== true){
                  delete usuario.password
                  req.session.usuarioLogeado = usuario
                  res.redirect("/perfil")
              } else{
                res.redirect("/login")
              }
     } else{
        res.redirect("/login")}
        } catch (error) {
          console.log("Error :",error)
        }},

    edit: async (req,res)=>{
      const buscarUsuario = await db.Usuarios.findByPk(req.params.id)
        try {
          if (buscarUsuario) return res.render('users/edicionUser', {user: buscarUsuario})
        }catch{
          return res.send("ERROR 404 NOT FOUND")
        }
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
          "imagen": req.file.filename,
          "password": bcryptjs.hashSync(req.body.password,10),
          "admin": false
          })
      } catch (error) {
        console.log("Error :",error)
      }}
        return res.redirect("/")
      },
    editProcess: async (req,res)=>{
      const buscarUsuario = await db.Usuarios.findByPk(req.params.id)
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length>0){
        return res.render('users/edicionUser',{
          errors: resultValidation.mapped(),
          user: buscarUsuario,
        })};
      if (req.file == undefined){  imagenf = req.body.imagen} 
      else {  imagenf = req.file.filename  }
      
      try{
       await db.Usuarios.update({
            nombre:   req.body.nombre,
            apellido: req.body.apellido,
            celular:  req.body.celular,
            email:   req.body.email,
           // editarUsuario.password: req.body.password
            imagen: imagenf
        }, { 
            where: {
              id: req.params.id
            } 
        })
          return res.redirect("/perfil/"+req.params.id)
      }
      catch{ return res.send("ERROR 404 NOT FOUND")
          res.redirect("/")
      }
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
    delete: async (req,res)=>{
      const buscarUsuario = await db.Usuarios.findByPk(req.params.id)
        try {
          if (buscarUsuario) return res.render('users/borrarUser', {user: buscarUsuario})
        }catch{
          return res.send("ERROR 404 NOT FOUND")
        }
    },
    deleteProcess: async (req,res) => {
      try {
        const usuarioEliminado = await db.Usuarios.destroy({
          where: {id:req.params.id}
        })
        console.log(usuarioEliminado)
        return res.redirect ("/usersList")
      } catch(error){
      console.log(error);
    }},
    
    logout: (req,res)=>{
      req.session.destroy()
        return res.redirect('/');
    }    
};


module.exports = registrocontroller
