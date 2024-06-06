module.exports = {
  HOST: "localhost",
  USER: "mareno",
  PASSWORD: "mareno123",
  DB: "crud",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
