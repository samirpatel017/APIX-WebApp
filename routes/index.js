const express = require('express');
const router = express.Router();

//import homecontroller from controllers
const homeController= require('../controllers/home.controller')


//router for home page
router.get('/',homeController.home);
router.get('/sign-out',homeController.signOut);

//user router
router.use('/api',require('./api'))
router.use('/user',require('./user'))
router.use('/post',require('./post'))
router.use('/comment',require('./comment'))
router.use('/reset_password',require('./resetpassword'))
router.use('/like', require('./like'))

module.exports=router;