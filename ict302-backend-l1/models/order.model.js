const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Order extends Model {}
 // leaving spae for other attributes like 
  Order.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      //important attribute orderDate
      orderDate:{
        type:DataTypes.DATE,
          allowNull:false,
      },
      totalPrice:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
      },
      customerAddress:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      customerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "processing", "shipped", "delivered"),
        defaultValue: "pending",
      },
      orderNotes:{
        type:DataTypes.STRING,
        allowNull:true,
      }
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      timestamps: false,
    }
  );

  return Order;
};
