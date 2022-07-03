module.exports = app => {
    const member = require("../controllers/memberController.js");
    const router = require("express").Router();
    router.post("/",member.create);
    router.post("/insert",member.selectInsertByEmail);
    app.use("/api/member", router);
}