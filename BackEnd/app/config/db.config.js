module.exports = {
    HOST: "localhost",
    USER: "kai",
    PASSWORD: "kai@ji394",
    DB: "blog",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}