module.exports = (sequelize, DataTypes) => { 
    const User = sequelize.define('user', { 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: { 
            type : DataTypes.STRING,
            allowNull: false 
        },
        email: { 
            type : DataTypes.STRING,
            allowNull: false 
        },
        password: { 
          type : DataTypes.STRING,
          allowNull: false 
        },
     
    })
    return User
}