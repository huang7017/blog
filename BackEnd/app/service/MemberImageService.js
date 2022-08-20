const db = require("../models");
const MemberImage = db.memberImage;
const moment = require('moment');


//上傳頭貼
exports.imageUpload =  async(obj)=> {
    let memberId = obj.MemberId == null ? null : obj.MemberId;
    let file = obj.File == null? null : obj.File;
    let date = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
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
        let data = await MemberImage.findOrCreate({
            where: { member_id: memberId },
            defaults: memberImage});
        return data;
    }catch(e){
        console.log(e);
    }
}

//上傳頭貼
exports.getImage =  async(obj) => {
    let memberId = obj.MemberId == null ? null : obj.MemberId;
    try{
        let data = await MemberImage.findOne({
            where: { member_id: memberId }});
        return data;
    }catch(e){
        console.log(e);
    }
}
