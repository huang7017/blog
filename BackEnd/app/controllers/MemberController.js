const memberImageService = require("../service/MemberImageService");



exports.imageUpload = async(req,res)=>{
    var memberId = req.decoded.MemberId == null ? null : req.decoded.MemberId;
    var file = req.file == null? null : req.file; 
    if (!memberId || !file) {
        res.status(400).json({
          message: "Content can not be empty!"
        });
        return;
    }
    try {
        var obj = {
            MemberId:memberId,
            File:file
        }
        var data =await memberImageService.imageUpload(obj);
        return res.status(200).json({ data: data });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}