module.exports = (sequelize, DataTypes) => {

    let alias = 'Categorias';

    let cols = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.VARCHAR(255),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    };

    let config ={
        tableName: 'categorias',
    };
    
    const Categoria = sequelize.define(alias, cols, config);

    return Categoria;
}