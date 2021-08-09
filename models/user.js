const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH= path.join('/upload/user/avatars');
const helpers = require('helpers');
const imageFilter = require('../config/middleware');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    bio:{
        type:String
    },
    avatar:{
        type:String
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    facebookId:{
        type:String,
    },
    TwitterId:{
        type:String,
    },
    padFriend:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'PADFri'
        }
    ],
    
    friendships:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Friendship'
        }
    ],
     padFriendarr:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],

}, {
    timestamps: true
});

//storeing avatar here 

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});

//static function for multer

userSchema.statics.uploadedAvatar = multer({ storage: storage, limits: { fileSize: 2 * 1024 * 1024  },fileFilter:helpers.imageFilter }).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;


const User = mongoose.model('User', userSchema);

module.exports = User;