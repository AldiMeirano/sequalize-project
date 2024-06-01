module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("book", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["available", "unavailable "],
      defaultValue: "available",
      allowNull: false,
    },
  });
  return Book;
};
