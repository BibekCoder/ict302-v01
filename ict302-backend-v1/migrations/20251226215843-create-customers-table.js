'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      customerId:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
      },
      customerName:{  
        type:Sequelize.STRING,
        allowNull:false,
      },
      customerEmail:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
      },
      customerPhone:{
        type:Sequelize.STRING,
        allowNull:true,
      },
      customerAddress:{
        type:Sequelize.STRING,
        allowNull:true,
      },
      planManagerName:{
        type:Sequelize.STRING,
        allowNull:true,     
      },
      planManagerEmail:{
        type:Sequelize.STRING,
        allowNull:true,     
      },
      planManagerPhone:{
        type:Sequelize.STRING,
        allowNull:true,         
      },
      emailRecipient1:{         
        type:Sequelize.STRING,
        allowNull:true,         
      },
      emailRecipient2:{
        type:Sequelize.STRING,
        allowNull:true,         
      },
      emailRecipient3:{
        type:Sequelize.STRING,
        allowNull:true,
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};
