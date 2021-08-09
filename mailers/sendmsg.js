const nodemailer =require('../config/nodemailer');


exports.newMsg = (a)=>{
   let htmlString = nodemailer.renderTemplate({a:a},'/comments/newMsg.ejs');
   console.log(htmlString)
    nodemailer.transporter.sendMail({
        from:'apixcommunication@gmail.com',
        to: a[2], // list of receivers
        subject: "New Comment published ✔", // Subject line
       
        html: htmlString, // html body
  
    },(err,info)=>{
        if(err){
            console.log('error un sending mail ',err);
            return;
       }
       console.log('mail delivered',info);
       return;  

    })
}