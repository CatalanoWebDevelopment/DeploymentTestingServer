const sequelize = require("./db");
const User = sequelize.import("./models/user");
const Cigar = sequelize.import("./models/cigar");

User.hasMany(Cigar);
Cigar.belongsTo(User);

sequelize.sync().then(() => {
  console.log("Database and Tables Created.");
});
