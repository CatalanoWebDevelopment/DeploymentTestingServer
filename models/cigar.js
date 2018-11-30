module.exports = function(sequelize, DataTypes) {
  return sequelize.define("cigar", {
    name: DataTypes.STRING,
    ringGauge: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    strength: DataTypes.STRING,
    wrapperColor: DataTypes.STRING
  });
};
