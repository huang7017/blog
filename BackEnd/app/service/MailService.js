const nodemailer = require('nodemailer')
const config = require('../config/EmailConfig')
const smtpTransport = require('nodemailer-smtp-transport')



exports.send = async function(email,title,msg){
    const transport = nodemailer.createTransport(smtpTransport({
        host: config.HOST, //服務
        port: config.PORT, // smtp端口
        secure: true,
        auth: {
          user: config.USER, // 用戶名
          pass: config.CODE // SMTP授權碼
        }
    }));


    transport.sendMail({
            from: config.HOST, // 发件邮箱
            to: email, // 收件列表
            subject: title, // 标题
            html: msg // html 内容
        }, 
    function(error, data) {
        transport.close(); // 如果没用，关闭连接池
    })
}