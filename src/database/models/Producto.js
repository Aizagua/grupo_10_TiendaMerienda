module.exports = (sequelize, DataTypes) => {

    let alias = 'Productos';
    
    let cols = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        precio: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        id_productoCat: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

    };

    let config ={
        tableName: 'productos',
        timestamps: false
    };

    const Producto = sequelize.define(alias, cols, config);

    return Producto;
}