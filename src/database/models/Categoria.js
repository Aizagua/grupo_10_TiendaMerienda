module.exports = (sequelize, DataTypes) => {

    let alias = 'Categorias';

    let cols = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
    };

    let config ={
        tableName: 'categorias',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    };
    
    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(models) {
        Categoria.hasMany(models.Productos, { 
            as: "productos", 
            foreignKey: "id_productoCat"
        })
    }

    return Categoria;
}