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
  let productoNuevo = {
      "id": productoProducts.length+1, 
      "nombre": req.body.nombre,
      "descripcion": req.body.descripcion,
      "precio": req.body.precio,
      "descripcion2":req.body.descripcion2,
      "titulo":req.body.titulo,
      "imagen":req.body.imagen,
      "cantidad":req.body.cantidad
      }
    console.log(req.body)
    fs.writeFileSync(rutaArchivo, JSON.stringify([...productoProducts, productoNuevo], null, 2), "utf-8")
    return res.redirect("/")
  },
  edit: (req,res)=>{
    let editarProducto=productoProducts.find(row=>row.id==req.params.id)
    if (editarProducto) return res.render('productos/edicionProducto', { producto: editarProducto})
            else return res.send("ERROR 404 NOT FOUND")
      },
      editProcess:(req,res)=>{
        const editarProducto = productoProducts.find(row => row.id == req.params.id)
        editarProducto.nombre = req.body.nombre,
        editarProducto.descripcion = req.body.descripcion,
        editarProducto.precio = req.body.precio,
        editarProducto.descripcion2 = req.body.descripcion2,
        editarProducto.imagen = req.body.titulo,
        editarProducto.titulo = req.body.imagen,
        editarProducto.cantidad = req.body.cantidad
        fs.writeFileSync(rutaArchivo, JSON.stringify(productoProducts, null, 2), "utf-8") 
        return res.redirect("/")
        
      },
  list: function (req, res) {
      res.render('productos/listadoDeProductos', {listaProductos: productoProducts})
    },
}

module.exports = productsController