module.exports = (sequelize, DataTypes) => {

    let alias = 'Perfiles';

    let cols = {
        id: {
            type: DataTypes.BIGINT.UNSIGNED.UNSIGNED,
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
        timestamps: false
    };
    
    const Perfil = sequelize.define(alias, cols, config);
    
    Perfil.associate = function(models) {
        Perfil.hasMany(models.Usuarios, { 
            as: "usuarioPerfil",
            foreignKey: "id_perfil"
        })
    }
    return Perfil;
}