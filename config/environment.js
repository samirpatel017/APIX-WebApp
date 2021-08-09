const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory= path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory|| fs.mkdirSync(logDirectory));

const AccesslogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});
const developement ={
    name:'developement',
    asset_path:'./assets',
    session_cookie:'avengers',
    db:'codeial_User',
    smtp:{
        service:'gmail',
        host: "smtp.gmail.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: '', // generated ethereal user
          pass: '', // generated ethereal password
        },
      },
      FB_clientID: '',
      FB_clientSecret: '',
      FB_callbackURL: "http://localhost:8000/user/auth/facebook/callback",
      GGL_clientId: '',
      GGL_clientSecret: '',
      GGL_callbackURL: "http://localhost:8000/user/auth/google/callback",
      TTR_consumerKey: '',
      TTR_consumerSecret: '',
      TTR_callbackURL: "http://localhost:8000/user/auth/twitter/callback",
      TTR_userProfileURL  : 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
      jwt_secret :'codeial',
      morgan:{
          mode:'dev',
          options:{stream:AccesslogStream}
      }
}
const production = {
    name:'production',
    asset_path : process.env.APIX_ASSET_PATH,
    session_cookie: process.env.APIX_SESSION_COOKIE,
    db:process.env.APIX_DB,
    smtp:{
        service:'gmail',
        host: "smtp.gmail.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.APIX_AUTH_USER, // generated ethereal user
          pass: process.env.APIX_AUTH_PASS, // generated ethereal password
        },
      },
      FB_clientID: process.env.APIX_FBID,
      FB_clientSecret: process.env.APIX_FB_CS,
      FB_callbackURL: process.env.APIX_FBCB,
      GGL_clientId: process.env.APIX_GGLID,
      GGL_clientSecret: process.env.APIX_GGLSEC,
      GGL_callbackURL: process.env.APIX_GGLCLU,
      TTR_consumerKey: process.env.APIX_TID,
      TTR_consumerSecret: process.env.APIX_TSEC,
      TTR_callbackURL: process.env.APIX_TCB,
      TTR_userProfileURL :'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
      jwt_secret :process.env.APIX_JWT,
      morgan:{
        mode:'combined',
        options:{stream:AccesslogStream}
    }
}

// module.exports=eval(process.env.NODE_ENV)==undefined ? developement:eval(process.env.NODE_ENV);
module.exports=developement;
