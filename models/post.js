const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const POST_PATH= path.join('/upload/post/postimg');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post_img:{
        type:String,
    },
    //include the id of all commnets in this post schema as array of aobject
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]

    
}, {
    timestamps: true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',POST_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});
//submit kahan h?
//static function for multer

postSchema.statics.uploadedPostImg = multer({ storage: storage }).single('post_img');
postSchema.statics.postPath=POST_PATH;



const Post = mongoose.model('Post', postSchema);

module.exports = Post;