"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("orders", "customerId", {
      type: Sequelize.INTEGER,
      allowNull: true, // keep true temporarily (so old rows don't break)
    });

    await queryInterface.addConstraint("orders", {
      fields: ["customerId"],
      type: "foreign key",
      name: "fk_orders_customerId",
      references: {
        table: "customers",
        field: "customerId",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("orders", "fk_orders_customerId");
    await queryInterface.removeColumn("orders", "customerId");
  },
};
