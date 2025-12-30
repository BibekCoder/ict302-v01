const {Model, DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class EmailActivity extends Model {}

  EmailActivity.init(
    {
      emailLogId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'userId',
            delete: 'CASCADE',
        }
      },
      recipientEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      subject:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      sentAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    
      },
    },
    {
      sequelize,
      modelName: "EmailActivity",
      tableName: "email_log",
      timestamps: true, //unless you want createdAt/updatedAt
    }


    );

    
    return EmailActivity;
}