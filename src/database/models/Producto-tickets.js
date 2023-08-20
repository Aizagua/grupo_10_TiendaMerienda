module.exports = (sequelize,DataTypes) => {
let alias = "ProductoTickets";
let cols ={
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_producto: {
        type: DataTypes.BIGINT,
        allowNull: false
        // foreignKey ??
        },
    id_ticket: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.BIGINT,
        allowNull: false
    }, 
    precio:{
        type: DataTypes.BIGINT,
        allowNull: false
    }

};
let config = {
    tableName: "productotickets",
};
const ProductoTickets = sequelize.define (alias,cols,config);
return ProductoTickets;
};
