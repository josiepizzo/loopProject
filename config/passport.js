var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
//var bcrypt = require('bcrypt');

module.exports = function(passport, db) {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function(id, done) {
        db.User.findOne({ where: { id: id } }).then(function(dbUser) {
            done(null, dbUser)
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        console.log('hey in localsignup');
        console.log('username', username);
        console.log('password', password);
        db.User.find({ where: { username: username } }).then(function(dbUser) {
            console.log('in local signup dbUser');
            if (dbUser) {
                console.log('found existing dbUser', dbUser);
                return done(null, false);
            } else {
                //var salt = bcrypt.genSaltSync(10);
                //var hashedpassword = bcrypt.hashSync(password,salt);
                var hashedpassword = password;
                console.log('creatging user', password, username);
                db.User.create({ username: username, password: hashedpassword }).then(function(dbUser) {
                    console.log('created user', dbUser);
                    done(null, dbUser);
                }).catch(function(error) {
                    console.log('user create error', error);
                    done(error);
                });
            }
        });

    }));


    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            console.log('body', req.body);
            db.User.findOne({ where: { username: username } }).then(function(dbUser) {
                if (dbUser) {
                    console.log('in local login dbUser', password, dbUser.hashedpassword);
                    //if(bcrypt.compareSync(password,dbUser.hashedpassword)){
                    if (password == dbUser.password) {
                        return done(null, dbUser);
                    } else {
                        return done(null, false);
                    }

                } else {
                    return done(null, false);
                }
            })

        }
    ))
}
