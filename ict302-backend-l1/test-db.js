const sequelize = require("./config/db");

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Sequelize connected to the database successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    process.exit(1);
  }
}

testConnection();
