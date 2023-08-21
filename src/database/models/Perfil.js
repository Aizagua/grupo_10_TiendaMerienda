module.exports = (sequelize, DataTypes) => {

    let alias = 'Perfiles';

    let cols = {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
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