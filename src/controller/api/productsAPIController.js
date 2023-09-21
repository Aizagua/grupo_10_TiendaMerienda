const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Productos = db.Productos;
const Categorias = db.Categorias;


const productsAPIController = {

    list: async (req, res) => {
        let response = {data: {}};
        try {
            const [productos, categorias ] = await Promise.all([Productos.findAll({include: [{association: 'categoria'}]}), Categorias.findAll({include: [{association: 'productos'}]})])
            response.data.count = productos.length;
            response.data.countByCategory = {}

            categorias.forEach((categoria) => {
                response.data.countByCategory[categoria.nombre] = categoria.productos.length
            })

            response.data.products = productos.map((producto) => {
                return {
                    id: producto.id,
                    name: producto.nombre,
                    description: producto.descripcion,
                    category: producto.categoria.nombre,
                    detail: `/api/products/${producto.id}`,
                }
            })
            return res.json(response)

        } catch (error) {
            response.msg = 'Hubo un error'
            return res.json(response)
        }
    },

    detail: async (req, res) => {
        let response = {};
        try {
            const findProduct = await Productos.findByPk(req.params.id, {include: [{association: 'categoria'}]});
            response.meta = {
                status: 200,
                url: `/api/products/${req.params.id}`
            };
            response.data = findProduct;
            response.data.imagen = `/images/${findProduct.imagen}`

            return res.json(response);
        } catch (error) {
            console.error('Error buscando el producto:', error);
            response.meta = {
                status: 500,
                url: `/api/products/${req.params.id}`
            };
            response.msg = `Ops! Algo salio mal buscando el producto con id: ${req.params.id}`
            return res.status(500).json(response);
        }
    },
    /*
    create: (req,res) => {
        console.log(req.body)
        Productos
        .create(
            {
                nombre: req.body.nombre,
                precio: req.body.precio,
                cantidad: req.body.cantidad,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion,
                id_productoCat: req.body.id_productoCat,
                desc2: req.body.desc2,
                imagen: req.file.filename
            }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    update: (req,res) => {
        let productoId = req.params.id;
        Productos.update(
            {
                nombre: req.body.nombre,
                precio: req.body.precio,
                cantidad: req.body.cantidad,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion,
                id_productoCat: req.body.id_productoCat,
                desc2: req.body.desc2,
                imagen: req.file.filename
            },
            {
                where: {id: productoId}
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/products/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    destroy: (req,res) => {
        let productoId = req.params.id;
        Productos
        .destroy({where: {id: productoId}, force: true}) 
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/destroy/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/products/destroy/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    }*/
    
}

module.exports = productsAPIController;