module.exports = (sequelize, DataTypes) => {
  const Penalty = sequelize.define(
    "penalty",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
  return Penalty;
};
