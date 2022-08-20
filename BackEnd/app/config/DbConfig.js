if (process.env.NODE_ENV === "production") {
  
}else{
  module.exports = {
    HOST: "localhost",
    USER: "",
    CODE: "",
    DB: "blog",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}

//執行部署環境
//NODE_ENV=production node server.js
