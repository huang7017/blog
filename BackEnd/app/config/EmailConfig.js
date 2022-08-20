if (process.env.NODE_ENV === "production") {
    
}else{
    module.exports = {
        HOST: "smtp.gmail.com",
        PORT: 465,
        USER: "",
        CODE: ""
    }
}
  
  //執行部署環境
  //NODE_ENV=production node server.js
  