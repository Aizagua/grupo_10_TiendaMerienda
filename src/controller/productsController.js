const fs = require('fs')
const path = require('path')
const rutaArchivo = path.resolve('./src/database/products.json')
const productoProducts = JSON.parse(fs.readFileSync(rutaArchivo))

let productsController = {
  detalle:  function (req,res){
      const productoEncontrado = productoProducts.find(row => row.id == req.params.id)
      if (productoEncontrado) return res.render('productos/productDetail', { producto: productoEncontrado })
      else return res.send("ERROR 404 NOT FOUND")
      
  },

  create: (req, res) => {
  return res.render('productos/creacionProducto')
  },

  processCreate: (req, res) => {
    let ultimoProducto = productoProducts.slice(-1)
    let productoNuevo = {
      "id": ultimoProducto.id+1, 
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

  edit: (req,res)=>{
    const buscarProducto = productoProducts.find(row=>row.id==req.params.id)
    if (buscarProducto) return res.render('productos/edicionProducto', { producto: buscarProducto})
            else return res.send("ERROR 404 NOT FOUND")
  },

  editProcess:(req,res)=>{
    let editarProducto = {}
    editarProducto = productoProducts.find(row => row.id == req.params.id)
    editarProducto.nombre = req.body.nombre
    editarProducto.descripcion = req.body.descripcion  
    editarProducto.precio = req.body.precio  
    editarProducto.desc2 = req.body.desc2   
    editarProducto.titulo = req.body.titulo
    editarProducto.cantidad = req.body.cantidad 
    //editarProducto.imagen = req.file.filename  
    if (req.file == undefined){  editarProducto.imagen = editarProducto.imagen} 
    else {   editarProducto.imagen = req.file.filename  }
     

    fs.writeFileSync(rutaArchivo, JSON.stringify(productoProducts, null, 2), "utf-8") 
    console.log(req.editarProducto)
    return res.redirect("/")
        
  },

  list: function (req, res) {
      res.render('productos/listadoDeProductos', {listaProductos: productoProducts})
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