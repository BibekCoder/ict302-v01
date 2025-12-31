const {Model, DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class EmailLog extends Model {}
  EmailLog.init(
    {
      logId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,       
      },
      to: { type: DataTypes.STRING, allowNull: false },
      subject: { type: DataTypes.STRING, allowNull: false },
      templateName: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.STRING, allowNull: false }, // SENT / FAILED
      error: { type: DataTypes.TEXT, allowNull: true },
      sendAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "EmailLog",
      tableName: "email_logs",
      timestamps: false,
    }
  );

  return EmailLog;
};
