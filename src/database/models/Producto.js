module.exports = (sequelize, DataTypes) => {

    let alias = 'Productos';

    let cols = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING
        },
        descripcion: {
            type: DataTypes.STRING
        },
        precio: {
            type: DataTypes.BIGINT
        },
        id_productoCat: {
            type: DataTypes.BIGINT
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        deletedAt: {
            type: DataTypes.DATE,
        }
    };

    let config ={
        tableName: 'productos',
    };

    const Producto = sequelize.define(alias, cols, config);

    return Producto;
}