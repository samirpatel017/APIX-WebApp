const nodemailer =require('../config/nodemailer');


exports.resetPass = (token)=>{
    console.log('inside new reset mailer');

    nodemailer.transporter.sendMail({
        
        from:'apixcommunication.com@gmail.com',
        to: token.user.email, // list of receivers
        subject: "Apix | Link to reset password", // Subject line
       
        html: `<h3>Following is the link to reset your password. Please do not share it with anyone.</h3>
        <p>http://localhost:8000/reset_password/reset/?access_token=${token.access_token}</p><br>
        <p>Kindly click on the above link to change your password.</p>`, // html body
    
    },(err,info)=>{
        if(err){
            console.log('error un sending mail ',err);
            return;
       }
       console.log('mail delivered',info);
       return;  

    })
}