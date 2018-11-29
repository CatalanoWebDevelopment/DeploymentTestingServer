module.exports = function(sequelize, DataTypes) {
  return sequelize.define("user", {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING
  });
};
