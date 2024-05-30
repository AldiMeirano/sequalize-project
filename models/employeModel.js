module.exports = (sequelize, DataTypes) => {
  const Employe = sequelize.define(
    "employe",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      employe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Employe;
};


