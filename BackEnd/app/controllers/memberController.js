const memberService = require("../service/memberService");
const memberHistoryService = require("../service/memberHistoryService");
exports.create = async (req,res) => {
    var name = req.body.Name == null ? null : req.body.Name;
    var email = req.body.Email == null ? null : req.body.Email;
    var password = req.body.Password == null ? null : req.body.Password;

    if (!name|| !email || !password) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }  
    
    try {
        var member = await memberService.insert(req);
        return res.status(200).json({ status: 200, data: member, message: "Succesfully Insert" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.selectInsertByEmail = async(req,res) => {
    var name = req.body.Name == null ? null : req.body.Name;
    var email = req.body.Email == null ? null : req.body.Email;
    var password = req.body.Password == null ? null : req.body.Password;

    if (!name|| !email || !password) {
        res.status(400).send({
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
            memberHistoryService.insert(obj);
        }
        return res.status(200).json({ status: 200, data: data, message: "Succesfully Insert" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

}


exports.login = async (req,res) => {
    var email = req.body.Email == null ? null : req.body.Email;
    var password = req.body.Password == null ? null : req.body.Password;

    if (!email || !password) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }  
    
    try {
        obj = {
            Email:email,
            Password:password
        }
        var member = await memberHistoryService.query(obj);
        return res.status(200).json({ status: 200, data: member, message: "Succesfully Query" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}