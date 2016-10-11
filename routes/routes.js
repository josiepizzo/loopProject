var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcryptjs');

module.exports = function(app, passport){
	app.post('/login', function(req, res) {
		res.json({yes: 'yes'})
	});
	app.post('/register', function(req, res) {
		// console.log(req.body);
		var username = req.body.username;
		var password = req.body.password;
		console.log(username);
		console.log(password);
		// ------------Passport Code for Signup----------
		// passport.serializeUser(function(user,done){
		// 	done(null,user.id)
		// });

		// passport.deserializeUser(function(id,done){
		// 	User.findOne({where:{id:id}}).then(function(dbUser){
		// 		done(error,dbUser)
		// 	});
		// });
		console.log("we're here");
	 	passport.use('local-signup', new LocalStrategy({
        usernameField : username,
        passwordField : password,
        passReqToCallback : true 
    	},
	    function(req, username, password, done) {
	    	console.log(username);
	    	console.log(password);
	    	User.findOne({username:username}).then(function(dbUser){
	    		if (dbUser){
	    			return done(null,false);
	    		}
	    		else{
	    			var salt = bcrypt.genSaltSync(10);
	    			var hashedpassword = bcrypt.hashSync(password,salt);
	    			console.log("hashed pw");
	    			console.log(hashedpassword);
	    			console.log("username before user create");
	    			console.log(username);
	    			User.create({username:username,password:hashedpassword})
	    		}
	    	}).then(function(dbUser){
	    			return done(null,dbUser)
    		});
	    }
    // ----This code goes to the login--------
    // passport.use('local-login',new LocalStrategy({
    // 	usernameField:'username',
    // 	passwordField:'password',
    // 	passReqToCallback:true
    // },
    // function(req,username,password,done){
    //     console.log(req);
    // 		User.findOne({where:{username:username}}).then(function(dbUser){
    // 			if (dbUser){
    // 				if(bcrypt.compareSync(password,dbUser.hashedpassword)){
    // 					return done(null,dbUser);
    // 				}
    // 				else{
    // 					return done(null,false);
    // 				}

    // 			}
    // 			else{
    // 				return done(null,false);
    // 			}
    // 		})

    // }
    // ---------------------------------------
    ));
		// ----------------------------------------------

		res.end();
	})
	app.get('/logout', function(req, res) {
		req.logout();
		res.status(200).end();
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.status(404).end();
		}
	}
}