module.exports = (sequelize, datatypes) => {

    let alias = 'Categorias';

    let cols = {
        id: {
            type: datatypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
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
        tableName: 'categorias',
    };
    
    const Categorias = sequelize.define(alias, cols, config);

    return Categorias;
}