module.exports = app => {
    const auth = require("../controllers/AuthController");
    const router = require("express").Router();
    router.post("/register",auth.selectInsertByEmail);
    router.post("/code",auth.code);
    router.post("/login",auth.login);
    app.use("/api/auth", router);
}

