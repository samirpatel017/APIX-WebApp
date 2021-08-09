const express=require('express');
const router=express.Router();
const likes_controller=require('../controllers/likes_controller');
const passport = require('passport');

router.post('/toggle',passport.checkAuthentication, likes_controller.toggleLike);



module.exports=router;