const Post = require('../models/post');
const Comment = require('../models/comment');
const moment = require('moment');
const User = require('../models/user');
const Friendship = require('../models/friendship');
const PADFri=require('../models/padding_friend');

//function for home page
module.exports.home= async function(req,res){
    try{
        let post =await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',options: {sort:{"createdAt": "descending"}},
           
            populate:{
                path:'likes user'
            },
         
        }).populate('likes');
       

        let user = await User.find({});
      
        var bruth=null;
        if (req.user){
            var localmainuser= await User.findById(req.user._id).populate({
                path:'padFriend',
                populate:'user'
            })  
             bruth=localmainuser.padFriend 
        }
        
        /* new step 4: finding the friends of the logged in user */
        let friends = new Array();
        if (req.user)/* friends list will only be loaded if thhe user is signed in */
        {
            let all_friendships = await Friendship.find({ $or: [{ from_user: req.user._id }, { to_user: req.user._id }] })
                .populate('from_user')
                .populate('to_user');/* checking the friendship model in the fields "from user" and "to_user". the current logged in user has to be in one of them. and at the same time we are also populating it to see the user ids*/
            for (let fs of all_friendships)/* storing all the friendships in an array so that it is easy to load them in the front end quickly */
            {
                if (fs.from_user._id.toString() == req.user._id.toString())
                {
                    friends.push({
                        friend_name: fs.to_user.name,
                        friend_id: fs.to_user._id,
                        friend_avatar:fs.to_user.avatar
                    });
                }
                else if (fs.to_user._id.toString() == req.user._id.toString())
                {
                    friends.push({
                        friend_name: fs.from_user.name,
                        friend_id: fs.from_user._id,
                        friend_avatar:fs.from_user.avatar
                    });
                }
            }
        }

        return res.render('home.ejs',{
            title:'Apix | Home',
            post_list:post,
            all_user:user,
            moment:moment,
            friends:friends,
            paddreq:bruth
        });

    } catch(error){
        req.flash('error',"Error Post Not Found");
        console.log('post not found');
        return res.redirect('back');
           
    }

};




// //function for home page
// module.exports.home=function(req,res){
//     Post.find({})
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//     })
//     .exec((err,post)=>{
//         if(err){
//             req.flash('error',"Error Post Not Found");
//             console.log('post not found');
//             return;
//         }
//         User.find({},(err,user)=>{
//             if(err){
//                 console.log('User List not found');
//                 return;
//             }
//             return res.render('home.ejs',{
//                 title:'Codeial | Home',
//                 post_list:post,
//                 all_user:user,
//                 moment:moment
//             })
//         });
//     });
// };



module.exports.postUser=function(req,res){
    res.statusCode=200;
    return res.redirect('/user/profile')
};


module.exports.signOut=function(req,res){
    req.logout();
    req.flash('success_message',"Sign Out Successfully");
    return res.redirect('/user/sign_In');
}



