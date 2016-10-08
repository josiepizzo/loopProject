var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcrypt');

module.exports = function(passport){
	passport.serializeUser(function(user,done{
		done(null,user.id)
	}));

	passport.deserializeUser(function(id,done){
		User.findOne({where:{id:id}}).then(function(dbUser){
			done(error,dbUser)
		});

	});
	 passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, username, password, done) {
    	User.findOne({username:username}).then(function(dbUser){
    		if (dbUser){
    			return done(null,false);
    		}
    		else{
    			var salt = bcrypt.genSaltSync(10);
    			var hashedpassword = bcrypt.hashSync(password,salt);
    			User.create({username:username,password:hashedpassword})
    		}.then(function(dbUser){
    			return done(null,dbUser)
    		})
    	})
    }
    passport.use('local-login',new LocalStrategy({
    	usernameField:'username',
    	passwordField:'password',
    	passReqToCallback:true
    },
    function(req,username,password,done){
        console.log(req);
    		User.findOne({where:{username:username}}).then(function(dbUser){
    			if (dbUser){
    				if(bcrypt.compareSync(password,dbUser.hashedpassword)){
    					return done(null,dbUser);
    				}
    				else{
    					return done(null,false);
    				}

    			}
    			else{
    				return done(null,false);
    			}
    		})

    }
    ))
}