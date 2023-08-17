module.exports = (sequelize, datatypes) => {

    let alias = 'Productos';

    let cols = {
        id: {
            type: datatypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: datatypes.STRING
        },
        descripcion: {
            type: datatypes.STRING
        },
        precio: {
            type: datatypes.BIGINT
        },
        id_productoCat: {
            type: datatypes.BIGINT
        },
        createdAt: {
            type: datatypes.DATE,
        },
        updatedAt: {
            type: datatypes.DATE,
        },
        deletedAt: {
            type: datatypes.DATE,
        }
    };

    let config ={
        tableName: 'productos',
    };
    
    const Producto = sequelize.define(alias, cols, config);

    return Producto;
}