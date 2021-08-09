const Post = require('../models/post');
const Comment = require('../models/comment')
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const Like = require('../models/like');

module.exports.posting = async (req, res) => {
    try {
            let post = await Post.create({
                content: req.body.post_content,
                user: req.user._id,

            });
           
        
            let user = await User.findById(req.user._id);
            user.posts.push(post);
            user.save();
          
            
             if (req.xhr) {
               
                post = await post.populate('user', ['name', 'avatar']).execPopulate();
                return res.status(200).json({
                    data: {
                        post: post,
                    },
                    message: "Post created !"
                });
            }
            req.flash('success_message', 'Posted Successfully');
            return res.redirect('back');
     

    } catch (error) {
        req.flash('error', 'there is an error in posting')
        console.log(error)
        return res.redirect('back');

    }

}
module.exports.post_img = async (req, res) => {
    try {

        await Post.uploadedPostImg(req, res, async (err) => {
            console.log(req.file);

            console.log(req.body);
            if (err) {
                req.flash('error', 'upload file under 2024kb ')
                console.log('Error in post upload', err);
                return
            }
            let post = await Post.create({
                content: req.body.post_content,
                user: req.user._id,
                post_img :Post.postPath + '/' + req.file.filename
            });
           
            let user = await User.findById(req.user._id);
            user.posts.push(post);
            user.save();
            
            
            req.flash('success_message', 'Posted Successfully');
            return res.redirect('back');
        });

    } catch (error) {
        req.flash('error', 'there is an error in posting')
        console.log(error)
        return res.redirect('back');

    }

}

// module.exports.destroy = async (req, res) => {
//     try {
//         let post = await Post.findById(req.params.id);
//         if (post.user == req.user.id) {
//             let userId = post.user;
//             post.remove();
//             await Comment.deleteMany({ post: req.params.id });
//             let user = await User.findByIdAndUpdate(userId,{$pull:{posts: req.params.id}});
//             if (req.xhr) {

//                 return res.status(200).json({
//                     data: {
//                         post_id: req.params.id
//                     },
//                     message: "Post delted !"
//                 });
//             }
//             req.flash('success_message', 'Deleted Successfully');
//             return res.redirect('back');
//         }
//     } catch (error) {
//         req.flash('error', 'there is an error in posting')
//         return res.redirect('back');
//     }

// }
// module.exports.destroy = function(req, res){
  
//          Post.findById(req.params.id,function(err,post){
//         if (post.user == req.user.id) {
//             let userId = post.user;
//              Like.deleteMany({likable:post, onModel:'Post'});
//              Like.deleteMany({_id:{$in:post.comments}})
//             post.remove();
//             Comment.deleteMany({ post: req.params.id });
//             User.findByIdAndUpdate(userId,{$pull:{posts: req.params.id}},function(err,post){
//             if (req.xhr) {

//                 return res.status(200).json({
//                     data: {
//                         post_id: req.params.id
//                     },
//                     message: "Post delted !"
//                 });
//             }
//             req.flash('success_message', 'Deleted Successfully');
//             return res.redirect('back');
//         });
//         }
  
// })
// }
module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){

            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});



            post.remove();

            await Comment.deleteMany({post: req.params.id});


            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}