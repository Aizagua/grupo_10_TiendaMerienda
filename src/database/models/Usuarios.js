const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
module.exports = (sequelize,DataTypes) => {
let alias = "Usuarios";
let cols ={
    id: {
        type:DataTypes.bigint(20),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false

    },
    apellido: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cuit: {
        type:DataTypes.bigint(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_perfil: {
        type:DataTypes.bigint(20),
        allowNull: false
    }


};
let config = {
    tableName: "usuarios",
};
const Tickets = sequelize.define (alias,cols,config);
return Tickets;
};
