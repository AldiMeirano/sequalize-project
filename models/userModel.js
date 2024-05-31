module.exports = (sequelize, DataTypes) => { 
    const User = sequelize.define("user", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code_refferal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "siswa"],
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["verified", "no_verified", "pending"],
        defaultValue: "pending",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return User
}