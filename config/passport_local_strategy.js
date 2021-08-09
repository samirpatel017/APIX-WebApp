//aurthentication of user using passport

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true,
},
    function (req,email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finsing User --> Passport')
                return done(err);
            }
            if (!user || user.password != password) { 
                console.log('Invalid username/Password');
                return done(null, false, req.flash('error','Invalid Username or Password '));
            }

            return done(null, user);
        });
    }
));

//serialize the user function to dycript data in cookies

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//deserialize the user function to encrypt data to compare with database


passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding User --> Passport')
            return done(err);
        }
        return done(null, user);
    });
});

//check user is aurthenticated or not
passport.checkAuthentication = function (req, res, next) {
    //if user is  signed in then pass of the request tonext function controler
    if (req.isAuthenticated()) {
        return next();
    }
    //if user is not aurthenticated it will redirect too main page
    return res.redirect('/user/sign_In');
}


//user is aurthenticated then set his detail in index
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user conatin detail of signed in user from thesession cookie we are just sending this to locals for the views
        res.locals.user = req.user;
    }
    next();
}
//export function

module.exports = passport;