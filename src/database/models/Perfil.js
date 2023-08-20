module.exports = (sequelize, DataTypes) => {

    let alias = 'Perfiles';

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
        tableName: 'perfiles',
    };
    
    const Perfil = sequelize.define(alias, cols, config);

    return Perfil;
}