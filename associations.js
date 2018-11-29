const sequelize = require("./db");

sequelize.sync().then(() => {
  console.log("Database and Tables Created.");
});
