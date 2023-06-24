const fs = require('fs');
const path = require('path');
const rutaArchivo = path.resolve('./src/database/users.json');
const userUsers = JSON.parse(fs.readFileSync(rutaArchivo));


let registrocontroller = {
    registroUser: function (req, res) {
      res.render("../views/users/formRegistro")
    },
    loginUser:function (req,res) {
      res.render("../views/users/login")
    },

    edit: (req,res)=>{
      const buscarUsurio = userUsers.find(row=>row.id==req.params.id)
      if (buscarUsurio) return res.render('users/edicionUser', { user: buscarUsurio})
              else return res.send("ERROR 404 NOT FOUND")
    },
  
    editProcess:(req,res)=>{
      let editarUsuario = {}
      editarUsuario = userUsers.find(row => row.id == req.params.id)
      editarUsuario.nombre = req.body.nombre
      editarUsuario.apellido = req.body.apellido 
      editarUsuario.celular = req.body.celular 
      editarUsuario.correo = req.body.correo
      editarUsuario.correo = req.body.password
      editarUsuario.avatar = req.file.filename  
      
      fs.writeFileSync(rutaArchivo, JSON.stringify(userUsers, null, 2), "utf-8") 
      //console.log(req.editarUserio)
      return res.redirect("/")
          
    }



};



module.exports = registrocontroller
