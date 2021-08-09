const nodemailer =require('../config/nodemailer');


exports.newComment = (comment)=>{
   let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from:'apixcommunication@gmail.com',
        to: comment.user.email, // list of receivers
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