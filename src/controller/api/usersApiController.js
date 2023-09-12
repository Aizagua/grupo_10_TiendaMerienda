const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Usuarios = db.Usuarios;

const usersAPIController = {

    list: async (req, res) => {
        let response = {};
        try {
            const usuarios = await Usuarios.findAll()
            response.count = usuarios.length
            response.users = usuarios.map((user) => {
                return {
                    id: user.id,
                    nombre: user.nombre,
                    email: user.email,
                    detail: `api/users/${user.id}`
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
            const findUser = await Usuarios.findByPk(req.params.id, {attributes: {exclude: ['password', 'direccion', 'id_perfil', 'celular', 'cuit']}})
            response.meta = {
                status: 200,
                total: findUser.length,
                url: `/api/users/${req.params.id}`
            };
            response.data = findUser;
            response.data.imagen = `/public/images/user/${findUser.imagen}`
            return res.json(response);
        } catch (error) {
            console.error('Error al buscar usuario', error);
            response.meta = {
                status: 500,
                total: null,
                url: `/api/users/${req.params.id}`
            };
            response.msg = `Ops! Algo salio mal buscando al usuario con id: ${req.params.id}`;
            return res.status(500).json(response);
        }
    }
}

module.exports = usersAPIController;