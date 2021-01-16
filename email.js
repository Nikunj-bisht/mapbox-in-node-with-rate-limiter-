const nodemailer = require('nodemailer');

module.exports = async(mymail,url)=>{

  const transporter = nodemailer.createTransport({
    
    service:'gmail',
    port:3000,
    auth:{
        user:'nikkubisht12@gmail.com',
        pass:'nikugokuu'
    }

  });

  const mailDetails = {
      from:'nikkubisht12@gmail.com',
      to:mymail,
      subject:"Reset Password",
      text:url
  }

await transporter.sendMail(mailDetails);

}

