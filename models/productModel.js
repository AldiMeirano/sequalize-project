
module.exports = (sequelize, DataTypes) => { 
    const Product = sequelize.define("product", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
      published: {
        type: DataTypes.BOOLEAN,
      },
    });
    return Product
}