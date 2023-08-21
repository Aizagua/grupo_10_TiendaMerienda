const fs = require('fs')
const path = require('path')
const rutaArchivo = path.resolve('./src/database/products.json')
const productoProducts = JSON.parse(fs.readFileSync(rutaArchivo))
const db = require('../database/models');
const sequelize = db.sequelize;

let productsController = {
  detalle: async (req,res) => {
    const productoEncontrado = await db.Productos.findByPk(req.params.id)
      try{
        if (productoEncontrado) return res.render('productos/productDetail', { producto: productoEncontrado })
      }catch{
        return res.send("ERROR 404 NOT FOUND")
      }
      
  },


  create: (req, res) => {
  return res.render('productos/creacionProducto')
  },

  processCreate: (req, res) => {
    ultimoProducto = productoProducts.slice(-1)
    let idProducto = ultimoProducto[0].id
    let productoNuevo = {
      "id": idProducto +1, 
      "nombre": req.body.nombre,
      "descripcion": req.body.descripcion,
      "precio": req.body.precio,
      "desc2":req.body.desc2,
      "titulo":req.body.titulo,
      //"imagen":req.file.filename,
      "cantidad":req.body.cantidad,
      "codigo":req.body.codigo
      }
      if (req.file == undefined){  productoNuevo.imagen = "logo_tienda_merienda_white.png"} 
      else {   productoNuevo.imagen = req.file.filename  }
     
    
    fs.writeFileSync(rutaArchivo, JSON.stringify([...productoProducts, productoNuevo], null, 2), "utf-8")
    return res.redirect("/")
  },

  edit: async (req,res)=>{
    const buscarProducto = await db.Productos.findByPk(req.params.id)
      try {
        if (buscarProducto) return res.render('productos/edicionProducto', { producto: buscarProducto})
      }catch{
        return res.send("ERROR 404 NOT FOUND")
      }
  },

  editProcess: async (req,res)=>{
    try{
    db.Productos.update({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio
//editarProducto.desc2 = req.body.desc2   
//editarProducto.titulo = req.body.titulo
//editarProducto.cantidad = req.body.cantidad 
//if (req.file == undefined){  editarProducto.imagen = editarProducto.imagen} 
//else {   editarProducto.imagen = req.file.filename  }
    },{
      where: {id: req.params.id}
    })
    return res.redirect("/")

    }catch{
      console.log("Error")
      res.redirect("/")
    }      
    },
  mostrarProducto:function (producto) {
    let nose=productoProducts.find(row => row.id == req.params.id)
    if (nose) {
      // Si se encontró el producto, mostramos la información en los campos de edición del formulario
      document.getElementById("nombre").value =nose.id;
      document.getElementById("precio").value = nose.nombre;
      document.getElementById("descripcion").value =nose.precio ;
    } else {
      // Si el producto no se encuentra, mostramos un mensaje de error
      alert("Producto no encontrado.");
    }
  },

  list: (req, res) => {
    db.Productos.findAll()
        .then(productos => {
            res.render('./productos/listadoDeProductos.ejs', { listaProductos : productos });
        })
        .catch(error => {
            console.error( error);

        });
  },

  delete: (req,res)=>{
    const buscarProducto = productoProducts.find(row=>row.id==req.params.id)
    if (buscarProducto) return res.render('productos/borrarProducto', { producto: buscarProducto})
            else return res.send("ERROR 404 NOT FOUND")
  },
  deleteProcess: (req,res)=>{
    function encontrarId(item) { 
      return item.id == req.params.id;
    }
    const index = productoProducts.findIndex(encontrarId)
    if (index != -1) {
      productoProducts.splice(index, 1);
      fs.writeFileSync(rutaArchivo, JSON.stringify(productoProducts, null, 2), "utf-8")
      return res.redirect("/")
    }else{
      return res.render("Error en el borrado")
    }
  },
}

module.exports = productsController