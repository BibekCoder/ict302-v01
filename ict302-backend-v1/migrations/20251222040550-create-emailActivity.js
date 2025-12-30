'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('email_activities', {
      emailLogId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'userId'
        }
      },
      recipientEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subject:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      sentAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    
      },
    });
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.fropTable('email_activities');
  },
};


