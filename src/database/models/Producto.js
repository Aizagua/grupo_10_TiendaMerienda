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
        precio: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        desc2: {
            type: DataTypes.STRING(3000),
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
    
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
    
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        },

    };

    let config = {
        tableName: "productos",
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        deletedAt: "deleted_at",
        updatedAt: "updated_at",
    };

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function (models) {
        Producto.belongsTo(models.Categorias, { 
            as: "categoria",
            foreignKey: "id_productoCat"
        })
    }    

    return Producto;
}