const db = require("../models");
const MemberHistory = db.memberHistory;
const moment = require('moment');
const CryptoJS = require("crypto-js");
exports.insert  = async function(obj){
    console.log(obj.MemberId)
    var memberId = obj.MemberId == null ? null : obj.MemberId;
    var password = obj.Password == null ? null : obj.Password;
    var date = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
    // console.log(date);

    passwordData = hashPassword(password)

    const member = {
        memberid:memberId,
        password:passwordData.hash.toString(),
        salt:passwordData.salt.toString(),
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
        throw Error(e.message || "Some error occurred while creating the Memeber.") ;
    }
}


function hashPassword(password) {
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    var hash = CryptoJS.PBKDF2(    password
    , salt, {
        keySize: 128 / 32
    });

    return {
        salt: salt,
        hash: hash
    };
}