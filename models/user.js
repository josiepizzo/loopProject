'use strict';
var Sequelize = require('sequelize');
var passportLocalSequelize = require('passport-local-sequelize');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    user_id: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mysalt: DataTypes.STRING,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    score: DataTypes.INTEGER,
    match: DataTypes.STRING,
    usertype: DataTypes.STRING,
    paired: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  passportLocalSequelize.attachToUser(User, {
    usernameField: 'username',
    hashField: 'password',
    saltField: 'mysalt'
});
  return User;
};