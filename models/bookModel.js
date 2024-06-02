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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Book;
};
