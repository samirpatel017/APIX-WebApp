const express = require('express');
const router = express.Router();
const passport = require('passport');

//import homecontroller from controllers
const userController= require('../controllers/users_controller');
const friendship_controller= require('../controllers/friendship_controller');
const chat_controller= require('../controllers/chat_controller');

//router for home page
router.get('/sign_Up',userController.signUp);
router.get('/sign_In',userController.signIn);
router.get('/profile/:id/toggle_friend',passport.checkAuthentication,friendship_controller.toggle_friendship);
router.get('/friendreq/:id',passport.checkAuthentication,friendship_controller.padding_friend);
router.get('/friendreq/cancel/:id',passport.checkAuthentication,friendship_controller.cancel_friend);
router.get('/chatbox',passport.checkAuthentication,chat_controller.chatbox);
router.get('/profile/:id',passport.checkAuthentication,userController.userProfile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.post('/create', userController.create);
router.post('/create-session',
            passport.authenticate('local', { failureRedirect: '/user/sign_In',failureFlash:true,}),
            userController.loginUser);
// router.get('/sign-out',userController.signOut);
router.get('/auth/google',
            passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback', 
            passport.authenticate('google', { failureRedirect: '/user/sign_In' }),
            userController.loginUser );

router.get('/auth/facebook',
            passport.authenticate('facebook', { scope: ['public_profile','email','user_friends'] }));

router.get('/auth/facebook/callback',
            passport.authenticate('facebook', { failureRedirect: '/user/sign_In'  }),
            userController.loginUser );

router.get('/auth/twitter', passport.authenticate('twitter',{scope:['profileFields ','email']}));


router.get('/auth/twitter/callback',
            passport.authenticate('twitter', { failureRedirect: '/user/sign_In'  }),
            userController.loginUser );
router.post('/sendmsg/:id',passport.checkAuthentication,userController.msg);

module.exports=router;