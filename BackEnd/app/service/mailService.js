const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')



exports.send = async function(email,title,msg){
    const transport = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com', //服務
        port: 465, // smtp端口
        secure: true,
        auth: {
          user: 'huang7017@gmail.com', // 用戶名
          pass: 'fptldzojohtltnxl' // SMTP授權碼
        }
    }));


    transport.sendMail({
            from: 'huang7017@gmail.com', // 发件邮箱
            to: email, // 收件列表
            subject: title, // 标题
            html: msg // html 内容
        }, 
    function(error, data) {
        transport.close(); // 如果没用，关闭连接池
    })
}