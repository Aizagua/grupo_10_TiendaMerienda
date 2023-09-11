const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Productos = db.Productos;



const productsAPIController = {
    'list': (req, res) => {
        db.Productos.findAll({
            include: ['categoria']
        })
        .then(productos => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: productos.length,
                    url: 'api/productos'
                },
                data: productos
            }
                res.json(respuesta);
            })
    },
    
    'detail': (req, res) => {
        db.Productos.findByPk(req.params.id,
            {
                include : ['categoria']
            })
            .then(productos => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: productos.length,
                        url: '/api/productos/:id'
                    },
                    data: productos
                }
                res.json(respuesta);
            });
    },
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
                        url: 'api/productos/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/productos/create'
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
                        url: 'api/productos/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/productos/update/:id'
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
                        url: 'api/productos/destroy/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/productos/destroy/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    }
    
}

module.exports = productsAPIController;