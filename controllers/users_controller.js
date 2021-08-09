const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const Friendship = require('../models/friendship');
const msgMailer = require('../mailers/sendmsg')
const chatBoxId = require('../models/chatboxid')
const Message = require('../models/message')
const PADFr= require('../models/padding_friend');

//function for user page profile
module.exports.userProfile =async function (req, res) {
    try {
        let user =await User.findById(req.params.id) 
        .populate({
            path:'posts',options: {sort:{"createdAt": "descending"}},
            populate:{
                path:'user'
            }
        });

        let pend = await User.findById(req.params.id).populate('padFriend');
        let req_pending=false
        for (let i of pend.padFriend){
            let oldre = await PADFr.findOne(i).populate('user');
            

                if (req.user.id==oldre.user.id)
                {   
                    req_pending=true 
                }
        }
        // message ------------------
        // ------------------
        let are_friends = false;
        let friendid=0;
        let msg=0
        Friendship.findOne({
            $or: [{ from_user: req.user._id, to_user: req.params.id },
            { from_user: req.params.id, to_user: req.user._id }]
        }, async function (error, friendship)
        {
            if (error)
            {
                console.log('There was an error in finding the friendship', error);
                return;
            }
            if (friendship)
            {
                are_friends = true;
                friendid=friendship._id
            }
            if (friendid!=0){
              msg =await chatBoxId.findOne({room_id:friendid}) 
                 .populate('messages');
             
                 if(msg==null){
                    msg =await chatBoxId.create({room_id:friendid,messages:[]})
                 }
               
             }
           
        return res.render('user_profile.ejs', {
            title: ' User Profile',
            profile_user:user,
            are_friends: are_friends,
            friendid:friendid,
            usermsgs:msg,
            req_pending:req_pending

        });
    });
    } catch (error) {
        console.log('error in finding user in profile user'); 
        return res.redirect('back');
    }
    
};

//function for user sign up page
module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    res.statusCode = 200;
    return res.render('user_sign_up.ejs', {
        title: 'Apix | Sign Up'
    });
};

//function for user sign in page
module.exports.signIn = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    res.statusCode = 200;
    return res.render('user_sign_in.ejs', {
        title: 'Apix | Sign In'
    });
};

//function for user sign in page
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash(`error`,`password Doesn't match please try again`);
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { 
                    console.log('Error in creating user while signing up'); 
                    return }
                    
                req.flash('success_message','Register Successfully ! Login here');
                return res.redirect('/user/sign_In');
            })
        } else {
            return res.redirect('back');
        }

    });
}

//function for user sign in page
module.exports.loginUser = function (req, res) {  
    return res.redirect('/');
};

// module.exports.signOut=function(req,res){
//     req.logout();
//     return res.redirect('/user/sign_In');
// }

module.exports.update=async (req,res)=>{
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,(err,user)=>{
    //         return res.redirect('back')
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized')
    // }
 if(req.user.id == req.params.id){
        try {
           
            let user =await User.findById(req.params.id);
            User.uploadedAvatar(req,res,(err)=>{
                if (err) { 
                    req.flash('error','upload file under 2024kb ')
                    console.log('Error in multer',err); 
                return res.redirect('back');
             }
               user.name= req.body.name;
               user.email= req.body.email;
               user.bio = req.body.bio;
               if (req.file) {
                if (user.avatar)
                {
                    if (fs.existsSync(path.join(__dirname, '..', user.avatar)))
                    {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                }

                   //this is saving a path of uploaded file into the avatar field in the user
                   user.avatar = User.avatarPath+'/'+req.file.filename;
                   
               }
               user.save();
               req.flash('success_message','Changed successfully');
               return res.redirect('back');    
            });
           
            }
        catch (error) {
            req.flash('error','Unauthorized');
            return res.status(401).send('Unauthorized');
        }

}else{
        return res.status(401).send('Unauthorized');
    }

}

module.exports.resetpass= function (req,res) {
    res.statusCode = 200;
    return res.render('reset_password/check_email.ejs', {
        title: 'Apix | Password reset'
    });
   
}


module.exports.msg= async (req,res)=>{
    try {
        let msg= req.body.msg
        let user =await User.findById(req.params.id) 
        let ruser= req.user.name
        let mail= req.user.email
        a=[msg,user.name,user.email,ruser,mail]
        console.log(a[2])
        msgMailer.newMsg(a)
        req.flash('success_message','Massage send successfully');
        return res.redirect('back');
    }  catch (error) {
        req.flash('error','Unauthorized',error);
        return res.status(401).send('Unauthorized');
    }
}