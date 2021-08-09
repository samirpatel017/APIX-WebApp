
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../models/post');


const postController= require('../controllers/post_controller');


router.post('/create',passport.checkAuthentication,postController.posting);
router.post('/create_image',passport.checkAuthentication,postController.post_img);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);

module.exports=router;
