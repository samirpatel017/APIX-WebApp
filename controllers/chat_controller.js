const User = require('../models/user');

module.exports.chatbox=async function(req,res){
    try {
        
       
        let user = await User.findById(req.query.id); 
        
        return res.render('_chatbox.ejs',{
            title:'chat',
            chatuser:user
        });
        } catch (error) {
            console.log('error in finding user in profile user',error); 
            return res.redirect('back');
        }
                    
}