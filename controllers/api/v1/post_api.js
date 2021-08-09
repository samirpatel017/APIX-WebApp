const Post = require('../../../models/post')

module.exports.index= async function(req,res){
   try{ 
       let post =await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',options: {sort:{"createdAt": "descending"}},
        populate:{
            path:'user',
            select:[ 'name', 'email','avatar']
        }
    })

  
    return res.json(200,{
        message:"list of profiles v1",
        posts:post
    })
    } catch (error) {
     
        console.log(error)
       

    }

}