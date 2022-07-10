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
        isenable:false,
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

exports.query  = async function(obj){
    var email = obj.Email == null ? null : obj.Email;
    var password = obj.Password == null ? null : obj.Password;
    
    try{
        const [results, metadata] = await db.sequelize.query(
            "select mb.Id,mb.email,mb_h.password,mb_h.salt from member mb "+
            "inner join member_history mb_h on mb_h.memberid = mb.id "+
            "where email = :search_email",
            {
                replacements: { search_email: email },
            }
        );
        // console.log(results[0].password);
        return isPasswordCorrect(results[0].password,results[0].salt,password);
    }
    catch(e){
        throw Error(e.message || "Some error occurred while creating the Memeber.") ;
    }
}


function hashPassword(password) {
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    
    var hash = CryptoJS.PBKDF2(password
    ,salt,{
        keySize: 128 / 32
    });
    console.log(hash);
    return {
        salt: salt,
        hash: hash
    };
}

function isPasswordCorrect(savedHash, savedSalt, passwordAttempt) {
    console.log(savedHash);
    console.log(savedSalt);
    console.log(passwordAttempt);
    var hash = CryptoJS.PBKDF2(passwordAttempt
        ,savedSalt,{
            keySize: 128 / 32
    });

    console.log(hash.toString());
    return savedHash.toString() == hash.toString();
}