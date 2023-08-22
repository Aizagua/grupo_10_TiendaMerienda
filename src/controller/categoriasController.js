const db = require('../database/models');
const sequelize = db.sequelize;


const categoriasController = {

    'list': (req, res) => {
        db.Categorias.findAll()
            .then(categorias => {
                res.render('./productos/listadoDeCategorias.ejs', { categorias });
            })
            .catch(error => {
                console.error( error);
    
            });
      },

    create: (req, res) => {
        return res.render('productos/categoriaProducto')
    },

    processCreate: async (req, res) => {
        try {
            const categoria = await db.Categorias.findOne({
                where: {
                    nombre: req.body.nombre
                }
            })
            if (!categoria) {
                const nuevaCategoria = await db.Categorias.create({
                    nombre: req.body.nombre,                       
                }); 
            } 
            res.redirect('/categorias');    
        } catch (error) {
            console.error('Error al crear categoria:', error);
            res.status(500).send('Error al agregar la categoria');
        }
    },
         
}

module.exports = categoriasController;