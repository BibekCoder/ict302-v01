require("dotenv").config();
const app = require("./app");

// Pick port from .env OR fallback to 3000
const PORT = process.env.PORT || 3000;
const { sequelize } = require("./models");



// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
