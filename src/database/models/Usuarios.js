module.exports = (sequelize,DataTypes) => {
let alias = "Usuarios";
let cols ={
    id: {
        type:DataTypes.BIGINT,
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
        type: DataTypes.BIGINT,
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
        type:DataTypes.BIGINT,
        allowNull: false
    }


};
let config = {
    tableName: "usuarios",
};
const Tickets = sequelize.define (alias,cols,config);
return Tickets;
};
