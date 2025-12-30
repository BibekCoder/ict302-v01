const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const User = require("./user.model")(sequelize);
const Order = require("./order.model")(sequelize);
const EmailActivity = require("./emailactivity.model")(sequelize);
const Customer = require("./customer.model")(sequelize);

// Define associations if any
//User.hasMany(Order, { foreignKey: "userId" });
//Order.belongsTo(User, { foreignKey: "userId" });


//this code helps to activate foreign keys relationships
Object.values(sequelize.models).forEach((model) => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

User.hasMany(EmailActivity, { foreignKey: "userId" });
EmailActivity.belongsTo(User, { foreignKey: "userId" });  

Customer.hasMany(Order,{foreignKey:"customerId"});
Order.belongsTo(Customer,{foreignKey:"customerId"});

module.exports = { sequelize, User, Order, EmailActivity ,Customer};