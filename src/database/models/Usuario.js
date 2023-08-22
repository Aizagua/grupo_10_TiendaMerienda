
module.exports = (sequelize,DataTypes) => {
let alias = "Usuarios";
let cols ={
    id: {
        type:DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false

    },
    apellido: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cuit: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    id_perfil: {
        type:DataTypes.BIGINT,
        allowNull: true
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
    imagen:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
};
let config = {
    tableName: "usuarios",
    timestamps: true,
    createdAt: 'created_at',
    deletedAt: "deleted_at",
    updatedAt: "updated_at",
    updatedAt: "updated_at"
};
const Usuario = sequelize.define (alias,cols,config);

Usuario.associate = function (models) {
    Usuario.belongsTo(models.Perfiles, { 
        as: "usuarioPerfil",
        foreignKey: "id_perfil"
    })

}
return Usuario
}
