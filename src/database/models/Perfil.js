module.exports = (sequelize, datatypes) => {

    let alias = 'Perfiles';

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
        tableName: 'perfiles',
    };
    
    const Perfil = sequelize.define(alias, cols, config);

    return Perfil;
}