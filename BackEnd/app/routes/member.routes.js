module.exports = app => {
    const member = require("../controllers/memberController.js");
    const router = require("express").Router();
    router.post("/",member.create);
    router.post("/insert",member.selectInsertByEmail);
    router.post("/login",member.login);
    router.post("/code",member.code);
    app.use("/api/member", router);
}

