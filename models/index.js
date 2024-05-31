const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize;
db.products = require("./productModel.js")(sequelize, DataTypes);
db.user = require("./userModel.js")(sequelize, DataTypes);
db.book = require("./bookModel.js")(sequelize, DataTypes);
db.employe = require("./employeModel.js")(sequelize, DataTypes);
db.transaction = require("./transactionModel.js")(sequelize, DataTypes);
db.penalty = require("./penaltyModel.js")(sequelize, DataTypes);
db.sequelize.sync({ force: false }).then(() => {
  console.log("Yes re-sync done");
});


db.transaction.belongsTo(db.user, { foreignKey: "userId" });
db.transaction.belongsTo(db.employe, { foreignKey: "employeId" });
db.transaction.belongsTo(db.book, { foreignKey: "bookid" });
db.transaction.belongsTo(db.penalty, { foreignKey: "penaltyId" });

// Relationship between table
db.user.hasMany(db.transaction, { foreignKey: "userId" });
db.employe.hasMany(db.transaction, { foreignKey: "employeId" });
db.book.hasMany(db.transaction, { foreignKey: "bookid" });
db.penalty.hasMany(db.transaction, { foreignKey: "penaltyId" });


module.exports = db