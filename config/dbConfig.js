module.exports = {
  HOST: "128.199.206.234",
  USER: "demo",
  PASSWORD: "Admin@123456",
  DB: "crud",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};