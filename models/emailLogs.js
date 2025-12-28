module.exports = (sequelize, DataTypes) => {
  const EmailLog = sequelize.define(
    "EmailLog",
    {
      to: { type: DataTypes.STRING, allowNull: false },
      subject: { type: DataTypes.STRING, allowNull: false },
      templateName: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.STRING, allowNull: false }, // SENT / FAILED
      error: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "email_logs",
      timestamps: true,
    }
  );

  return EmailLog;
};
