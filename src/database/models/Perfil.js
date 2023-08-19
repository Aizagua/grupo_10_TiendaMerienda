module.exports = (sequelize, DataTypes) => {

    let alias = 'Perfiles';

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
        tableName: 'perfiles',
    };
    
    const Perfil = sequelize.define(alias, cols, config);

    return Perfil;
}