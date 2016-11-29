var nodeMailer = require("nodemailer");

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'arcaniteamp@gmail.com',
        pass: 'trxtrxtrx'
    }
  };
var transporter = nodeMailer.createTransport(smtpConfig);

module.exports = {
  
  sendMail: function (data) {
    transporter.sendMail({
      from: 'arcaniteamp@gmail.com',
      to: 'hazielfe@gmail.com',
      subject: 'weas re fomes',
      html: '<h1>hola re mundo</h1>'
    }, function (err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info)
      }
    });
  }
  
};