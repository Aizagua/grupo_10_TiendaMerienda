const fs = require('fs')
const path = require('path')
const rutaArchivo = path.resolve('./src/database/products.json')
const productoProducts = JSON.parse(fs.readFileSync(rutaArchivo))
const db = require('../database/models');
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');

let productsController = {
  detalle: async (req,res) => {
    const productoEncontrado = await db.Productos.findByPk(req.params.id)
      try{
        if (productoEncontrado) return res.render('productos/productDetail', { producto: productoEncontrado })
      }catch{
        return res.send("ERROR 404 NOT FOUND")
      }
      
  },

  add: async (req, res) => {
    try {
        const listadoCategorias = await db.Categorias.findAll();
        res.render('productos/creacionProducto', { listadoCategorias });
    } catch (error) {
        console.error("Error al cargar las categorías desde la base de datos:", error);
        res.send(error);
    }
  },

  create: (req, res) => {
  return res.render('productos/creacionProducto')
  },

  processCreate: async (req, res) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        const listadoCategorias = await db.Categorias.findAll();
        return res.render('productos/creacionProducto', {
            listadoCategorias,
            errores: errores.array(),
            oldData: { ...req.body }
        });
    }

    try {
      const nuevoProducto = await db.Productos.create({
        nombre: req.body.nombre,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        id_productoCat: req.body.id_productoCat,
        desc2: req.body.desc2,
        imagen: req.file.filename
       
      });      
      res.redirect('/productList');
    } catch (error) {
      console.error('Error al crear el producto:', error);
      res.status(500).send('Error al agregar el producto');
    }
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
      precio: req.body.precio,
      imagen: req.file.filename,
      desc2: req.body.desc2,
      cantidad : req.body.cantidad 
//editarProducto.desc2 = req.body.desc2   
//editarProducto.titulo = req.body.titulo
//editarProducto.cantidad = req.body.cantidad 
//if (req.file == undefined){  editarProducto.imagen = editarProducto.imagen} 
//else {   editarProducto.imagen = req.file.filename  }
    },{
      where: {id: req.params.id}
    })
    return res.redirect("/product/"+req.params.id)

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

  delete: async (req,res)=>{
    const buscarProducto = await db.Productos.findByPk(req.params.id)
      try {
        if (buscarProducto) return res.render('productos/borrarProducto', { producto: buscarProducto})
      }catch{
        return res.send("ERROR 404 NOT FOUND")
      }
  },
  deleteProcess: async (req,res) => {
    try {
      const productoEliminado = await db.Productos.destroy({
        where: {id:req.params.id}
      })
      console.log(productoEliminado)
      return res.redirect ("/productList")
    } catch(error){
    console.log(error);
  }}
  


}

module.exports = productsController