module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("transaction", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["borrow", "done"],
      defaultValue: "borrow",
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    penaltyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cart: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Transaction;
};
