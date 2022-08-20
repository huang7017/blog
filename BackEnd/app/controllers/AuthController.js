const memberService = require("../service/MemberService");
const memberHistoryService = require("../service/MemberHistoryService");
const mailService = require("../service/MailService");
const emailCodeService = require("../service/EmailCodeService");
const jwt = require("jsonwebtoken");
const config = require('../config/JwtConfig');


exports.selectInsertByEmail = async(req,res) => {
    var name = req.body.Name == null ? null : req.body.Name;
    var email = req.body.Email == null ? null : req.body.Email;
    var password = req.body.Password == null ? null : req.body.Password;

    if (!name|| !email || !password) {
        res.status(400).json({
          message: "Content can not be empty!"
        });
        return;
    }

    try {
        var data = await memberService.selectInsertByEmail(req);
        if(data.Created){
            obj = {
                MemberId:data.Data.id,
                Password:password,
            }
            var memberId = data.Data.id;
            memberHistoryService.insert(obj);

            const randomFns=()=> { // 生成6位随机数
                let code = ""
                for(let i= 0;i<6;i++){
                    code += parseInt(Math.random()*10)
                }
                return code 
            }
            let code=randomFns()
            mailService.send(email,'驗證你的信箱',`
            <p>你好！</p>
            <p>您正在註冊blog帳號</p>
            <p>你的驗證碼是：<strong style="color: #ff4e2a;">${code}</strong></p>
            <p>***該驗證碼5分鐘内有效***</p>`);

            if(code != null){
                codeObj = {
                    Email : email,
                    Code : code,
                    MemberId : memberId,
                }

                emailCodeService.selectInsertByEmail(codeObj);
            }
        }
        return res.status(200).json({ status: 200, data: data, message: "Succesfully Insert" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

}


exports.code = async (req,res) => {
    var email = req.body.Email == null ? null : req.body.Email;
    var code = req.body.Code == null? null : req.body.Code;
    var status = req.body.Status == null? null : req.body.Status;
    if (!email || !code) {
        res.status(400).json({
          message: "Content can not be empty!"
        });
        return;
    }

    try {
        obj = {
            Email:email,
            Code:code,
            Status:status
        }
        var code = await emailCodeService.query(obj);
        if(code.data != null){
            memberService.update(obj);
            var member =  await memberService.findByOne(obj);
            obj.MemberId = member.dataValues.id;
            obj.IsEnable = true;
            memberHistoryService.update(obj);
        }

        return res.status(200).json({ status: 200, data: true, message: "Succesfully Query" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

}

exports.login = async (req,res) => {
    var email = req.body.Email == null ? null : req.body.Email;
    var code = req.body.Code == null ? null : req.body.Code;

    if (!email || !code) {
        res.status(400).json({
          message: "Content can not be empty!"
        });
        return;
    }  
    
    try {
        obj = {
            Email:email,
            Password:code
        }
        var memberId = await memberHistoryService.query(obj);
        if(memberId == false){
             return res.status(403).json({ message: "帳號或密碼輸入錯誤" });;
        }
        const token = jwt.sign({ MemberId:memberId, }, config.JWT_SIGN_SECRET, { expiresIn: '1 day' });

        return res.status(200).json({ status: 200, token, message: "Succesfully Query" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}