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
      const buscarUsuario = userUsers.find(row=>row.id==req.params.id)
      if (buscarUsuario) return res.render('users/edicionUser', { user: buscarUsuario})
              else return res.send("ERROR 404 NOT FOUND")
    },
    processCreate: (req, res) => {
      let ultimoUser = userUsers.slice(-1)
      let userNew = {
          "id": ultimoUser.id+1, 
          "nombre": req.body.nombre,
          "apellido": req.body.apellido,
          "celular": req.body.celular,
          "email": req.body.correo,
          //"imagen": req.file.filename,
          "password": req.body.password,
          }
          if (req.file == undefined){  userNew.imagen = "logo_tienda_merienda_white.png"} 
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
};



module.exports = registrocontroller
