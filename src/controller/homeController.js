const fs=require('fs');
const path=require('path');
const rutaArchivo = path.resolve('./src/database/products.json')
const homeProductos = JSON.parse(fs.readFileSync(rutaArchivo))

let homeController = {
    index: function (req, res) {
      res.render("home",{menu: homeProductos})
    },
};

module.exports = homeController