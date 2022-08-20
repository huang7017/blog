const db = require("../models");
const MemberImage = db.memberImage;
const moment = require('moment');


//上傳頭貼
exports.imageUpload =  async function(obj){
    var memberId = obj.MemberId == null ? null : obj.MemberId;
    var file = obj.File == null? null : obj.File;
    var date = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
    const memberImage = {
        member_id:memberId,
        type: file.mimetype,
        name: file.originalname,
        file: file.buffer,
        create_id : 0,
        create_time : date,
        modify_id : 0,
        modify_time : date
    }

    try{
        var data = await MemberImage.findOrCreate({
            where: { email: email },
            defaults: memberImage});
        return data;
    }catch(e){
        console.log(e);
    }
}
