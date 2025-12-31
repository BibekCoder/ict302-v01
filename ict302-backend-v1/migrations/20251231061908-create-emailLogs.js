'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('email_logs', {
      to:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      subject:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      templateName:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      status:{
        type: Sequelize.STRING,
        allowNull: false, // SENT / FAILED
      },
      error:{
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('email_logs');
  },
};
