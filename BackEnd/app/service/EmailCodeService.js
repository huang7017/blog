const db = require("../models");
const EmailCode = db.emailCode;
const op = db.op;
const moment = require('moment');

exports.selectInsertByEmail = async function(obj){
    var email = obj.Email == null ? null : obj.Email;
    var code = obj.Code == null ? null : obj.Code;
    var memberId = obj.MemberId == null ? null : obj.MemberId;
    var date = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');

    const emailCode = {
        email : email,
        code : code,
        createid : memberId,
        createtime : date,
        modifyid : memberId,
        modifytime : date
    }
    
    try{
        const [data, created] = await EmailCode.findOrCreate({
            where: { email: email },
            defaults: emailCode
        });

        return {Data:data,Created:created};
    }
    catch(e){
        throw Error(e.message || "Some error occurred while creating the Memeber.") ;
    }
}


exports.query = async function(obj){
    var email = obj.Email == null? null : obj.Email;
    var code = obj.Code == null? null : obj.Code;
    try{
        const data = await EmailCode.findAll({
            where: {
              email: {
                [op.eq]: email
              },
              code: {
                [op.eq]: code
              }
            }
          });

        return {data};
    }
    catch(e){
        throw Error(e.message || "Some error occurred while creating the Memeber.") ;
    }

}