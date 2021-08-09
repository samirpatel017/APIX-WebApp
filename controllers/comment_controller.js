const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailers')
const Like=require('../models/like');

module.exports.commenting= async (req,res)=>{
    try {
     
    let post =await Post.findById(req.body.post);
      console.log(req.body.comment_content)
    if(post){
        let comment =await Comment.create({
            content:req.body.comment_content,
            user:req.user._id,
            post:req.body.post
            
        });
        console.log(comment)
        post.comments.push(comment);
        post.save();
        comment = await comment.populate('user', ['name','avatar','email']).execPopulate();
        console.log('Vidhroh')
        // commentsMailer.newComment(comment);
        if(req.xhr){
           
            return res.status(200).json({
                data:{
                    post:post.comments, 
                    comment:comment    
                },
                message:"Post created !"
            });
         
        }   
       
         return res.redirect('back');
        };
    }

     catch (error) {
        console.log('Error !! in Creating Comment ');
        return res.redirect('back');
    }
    
}

// module.exports.destroy=async (req,res)=>{
//     try {
//         let comment=await  Comment.findById(req.params.id).populate('post');
//         if(comment.user == req.user.id || comment.post.user == req.user.id){
           
//             let postId= comment.post._id;
//             console.log('postid',postId)
//             comment.remove();
            
//             // await Post.findByIdAndUpdate(postId, {$pull:{commnets:req.params.id}});
//             console.log('true,',Post.findByIdAndUpdate(postId, { $pull : {comments : req.params.id } }))
//             if(req.xhr)
//             {
//                 Post.findByIdAndUpdate(postId, { $pull : {comments : req.params.id } });
               
//                 return res.status(200).json(
//                     {
//                         data:
//                         {
//                             comment_id:req.params.id,
//                         },
//                         message:'Comment deleted!'
//                     }
//                 )
//             }
//             req.flash('success_message','Comment deleted successfully')
//                 return res.redirect('back');
            
//         }else{
//             return res.redirect('back');
//         }
          
//     } catch (error) {
//         console.log('Error !! in Creating Comment ');
//         return res.redirect('back');
//     }
        
// }
  
    module.exports.destroy = function(req,res){
 
        Comment.findById(req.params.id , function(err , comment){
            if(comment.user == req.user.id || comment.post.user == req.user.id){
                let postid = comment.post;
                Like.deleteMany({likable:comment._id, onModel:'Comment'});
                comment.remove();
                
                Post.findByIdAndUpdate(postid, { $pull : {comments : req.params.id } }, function(err , post){
                    if(req.xhr){
                        
                        return res.status(200).json({
                            data : {
                                comment_id:req.params.id,
                            },
                            message : 'Comment Deleted by AJAX !'
                        })
                    }
    
                    req.flash('success_message','Comment deleted successfully')
                    return res.redirect('back');
                })
            }else{
                return res.redirect('back')
            }
        });
    }

