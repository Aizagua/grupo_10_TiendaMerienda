module.exports = (sequelize,DataTypes) => {
let alias = "Tickets";
let cols ={
    id: {
        type:DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    fecha:{
        type:DataTypes.DATE,
    },
    id_usuario:{
        type:DataTypes.BIGINT,
    },

};
let config = {
    tableName: "tickets",
};
const Tickets = sequelize.define (alias,cols,config);
return Tickets;
};
