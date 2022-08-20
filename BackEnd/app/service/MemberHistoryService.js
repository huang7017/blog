const db = require("../models");
const MemberHistory = db.memberHistory;
const moment = require('moment');
const webCrypto = require('../helpers/WebCrypto');


exports.insert  = async function(obj){
    console.log(obj.MemberId)
    var memberId = obj.MemberId == null ? null : obj.MemberId;
    var password = obj.Password == null ? null : obj.Password;
    var date = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');

    var salt = webCrypto.generateUUID(); 

    const member = {
        memberid:memberId,
        password:webCrypto.getHash(webCrypto.HashType.SHA512,password+salt),
        salt:salt,
        isenable:false,
        errorcount:0,
        createid : 0,
        createtime : date,
        modifyid : 0,
        modifytime : date
    }

  
    try{
        var data = await MemberHistory.create(member);
        return data;
    }
    catch(e){
        console.log(e);
    }
}

exports.query  = async function(obj){
    var email = obj.Email == null ? null : obj.Email;
    var password = obj.Password == null ? null : obj.Password;
    try{
        const [results, metadata] = await db.sequelize.query(
            "select mb.Id,mb.email,mb_h.password,mb_h.salt from member mb "+
            "inner join member_history mb_h on mb_h.memberid = mb.id and mb_h.isenable = true "+
            "where email = :search_email",
            {
                replacements: { search_email: email },
            }
        );
        // console.log(results[0].password);
        if(results !== 'undefined'){
            if(results[0].password === webCrypto.getHash(webCrypto.HashType.SHA512,password+results[0].salt)){
                return results[0].id;
            }
        }
        return  false;
    }catch(e){
        console.log(e.message);
        return  false;
    }
}

exports.update = async function(obj){
    var memberid = obj.MemberId == null ? null : obj.MemberId;
    var isenable = obj.IsEnable == null? null : obj.IsEnable;

    const memberHistory = {
        isenable: isenable
    }

    try{
        var data = await MemberHistory.update(
            memberHistory,
            { where: { memberid: memberid } }
        );

        return data;
    }catch(e){
        throw Error(e.message || "Some error occurred while creating the Memeber.") ;
    }
}