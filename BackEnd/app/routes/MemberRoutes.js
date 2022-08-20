module.exports = app => {
    const member = require("../controllers/MemberController.js");
    const router = require("express").Router();
    const multer = require('multer');
    const upload = multer({});
    const authenticationMiddleware = require("../helpers/Middleware");
    router.use(authenticationMiddleware);
    router.post("/image/Uploade",upload.single('File'),member.imageUpload);
    app.use("/api/member", router);
}

// ap/member/code
// 進入code前會先經過authenticationMiddleware