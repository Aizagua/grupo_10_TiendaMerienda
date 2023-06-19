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
      "imagen":req.body.img
      } 
    fs.writeFileSync(rutaArchivo, JSON.stringify([...productoProducts, productoNuevo], null, 2), "utf-8")
    return res.redirect("/")
  },
  list: function (req, res) {
      res.render("../views/productos/listadoDeProductos")
    },
}

module.exports = productsController