const sequelize = require("./db");
const User = sequelize.import("./models/user");
const Cigar = sequelize.import("./models/cigar");
const userCigar = sequelize.import("./models/userCigar");

Cigar.belongsToMany(User, { through: userCigar });
userCigar.belongsTo(User);
userCigar.hasMany(Cigar);

Cigar.belongsTo(userCigar);

sequelize.sync().then(() => {
  console.log("Database and Tables Created.");
});
