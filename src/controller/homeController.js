const fs=require('fs');
const path=require('path');
const rutaArchivo = path.resolve('./src/database/products.json')
const homeProductos = JSON.parse(fs.readFileSync(rutaArchivo))
const db = require('../database/models');
const sequelize = db.sequelize;

let homeController = {
    index: async function (req, res) {
      const productoHome = await db.Productos.findAll({
        where: {
          id: {
            [db.Sequelize.Op.lte]: 6, 
          }
        }
      });
      try{ 
      res.render("home",{productoHome})
    }catch (error) {
      console.error("Error al cargar las categorías desde la base de datos:", error);
      res.send(error);
  }}
};

module.exports = homeController