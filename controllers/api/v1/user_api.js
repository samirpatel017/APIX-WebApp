const User = require('../../../models/user');
const jwt = require('jsonwebtoken')
const env = require('../../../config/environment')


//function for user sign in page
module.exports.loginUser = async function (req, res) {  
  try {
      let user =await User.findOne({email:req.body.email});
      if(!user ){
        return res.json(422,{
            message:'Invalid usernameor password'
        })
      }
      if(user.password != req.body.password){
        return res.json(422,{
            message:'Invalid username or password'
        })
      }
      return res.json(200,{
        messag:'Sign in successfully here iss your token keep it safe',
        data:{
            token:jwt.sign( user.toJSON(),env.jwt_secret, {expiresIn:'1d'})
        }
      });

  } catch (error) {
      console.log('******',error);
      return res.json(500,{
          message:'Internal Server Error'
      });
  }  
};