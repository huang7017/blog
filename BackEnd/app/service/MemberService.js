const db = require("../models");
const Member = db.member;
const moment = require('moment');

//註冊帳號
exports.selectInsertByEmail = async function(req){
    let name = req.body.Name == null ? null : req.body.Name;
    let email = req.body.Email == null ? null : req.body.Email;
    let password = req.body.Password == null ? null : req.body.Password;
    let date = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');

    const member = {
        name : name,
        email : email,
        status:0,
        createid : 0,
        createtime : date,
        modifyid : 0,
        modifytime : date
    }
    
    try{
        const [data, created] = await Member.findOrCreate({
            where: { email: email },
            defaults: member
        });

        return {Data:data,Created:created};
    }
    catch(e){
    }
}


//更改是否啟用狀態
exports.update = async function(obj){
    let email = obj.Email == null ? null : obj.Email;
    let status = obj.Status == null? null : obj.Status;

    const member = {
        status: status
    }

    try{
        let data = await Member.update(
            member,
            { where: { email: email } }
        );

        return data;
    }catch(e){
    }
}


//email查詢資料
exports.findByOne = async function(obj){
    let email = obj.Email == null ? null : obj.Email;
    try{
        let data = await Member.findOne({
            where: {
                email: email
            }
        });
        return data;
    }catch(e){
    }
}


//上傳頭貼

exports.imageUpload =  async function(obj){
    let memberId = obj.MemberId == null ? null : obj.MemberId;
    let file = obj.File == null? null : obj.File;

    const member = {
        id:memberId,
        file: file
    }

    try{
        let data = await Member.update(
            member,
            { where: { email: email } }
        );

        return data;
    }catch(e){
    }
}
