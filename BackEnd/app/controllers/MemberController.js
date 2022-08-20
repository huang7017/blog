const memberImageService = require("../service/MemberImageService");



exports.imageUpload = async(req,res)=>{
    let memberId = req.decoded.MemberId == null ? null : req.decoded.MemberId;
    let file = req.file == null? null : req.file; 
    if (!memberId || !file) {
        res.status(400).json({
          message: "Content can not be empty!"
        });
        return;
    }
    try {
        let obj = {
            MemberId:memberId,
            File:file
        }
        let data =await memberImageService.imageUpload(obj);
        return res.status(200).json({ data: data });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getImage = async(req,res) =>{
    let memberId = req.decoded.MemberId == null ? null : req.decoded.MemberId;
    if (!memberId) {
        res.status(400).json({
          message: "Content can not be empty!"
        });
        return;
    }
    try {
        let obj = {
            MemberId:memberId
        }
        let data =await memberImageService.getImage(obj);
        return res.status(200).json({ data: data });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}