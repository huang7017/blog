const db = require("../models");
const Member = db.member;
const moment = require('moment');

exports.insert  = async function(req){
    var name = req.body.Name == null ? null : req.body.Name;
    var email = req.body.Email == null ? null : req.body.Email;
    var password = req.body.Password == null ? null : req.body.Password;
    var date = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
    // console.log(date);
    const member = {
        name : name,
        email : email,
        createid : 0,
        createtime : date,
        modifyid : 0,
        modifytime : date
    }

  
    try{
        var data = await Member.create(member);
        return data;
    }
    catch(e){
        throw Error(e.message || "Some error occurred while creating the Memeber.") ;
    }
}

exports.selectInsertByEmail = async function(req){
    var name = req.body.Name == null ? null : req.body.Name;
    var email = req.body.Email == null ? null : req.body.Email;
    var password = req.body.Password == null ? null : req.body.Password;
    var date = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');

    const member = {
        name : name,
        email : email,
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
        throw Error(e.message || "Some error occurred while creating the Memeber.") ;
    }
}