'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("orders","customerName");
    await queryInterface.removeColumn("orders","customerEmail");
    await queryInterface.removeColumn("orders","customerAddress");  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("orders","customerName",{
      type:Sequelize.STRING,
      allowNull:false,
    });
    await queryInterface.addColumn("orders","customerEmail",{
      type:Sequelize.STRING,
      allowNull:false,
    });
    await queryInterface.addColumn("orders","customerAddress",{
      type:Sequelize.STRING,
      allowNull:true,
    });
  },
};
