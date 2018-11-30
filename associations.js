const sequelize = require("./db");
const User = sequelize.model("user");
const Cigar = sequelize.model("cigar");
const userCigar = sequelize.model("userCigar");

Cigar.belongsToMany(User, { through: userCigar });
userCigar.belongsTo(User);
userCigar.hasMany(Cigar);

Cigar.belongsTo(userCigar);

sequelize.sync().then(() => {
  console.log("Database and Tables Created.");
});
