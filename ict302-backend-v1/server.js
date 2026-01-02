require("dotenv").config();
const app = require("./app");

const PORT=3000;
// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
