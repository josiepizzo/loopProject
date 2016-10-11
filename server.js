var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


var app = express();


var viewOptions = {
    root: __dirname + '/static/views'
}

var db = require('./models');


//line below allows anything that is in this folder to be accessed via the internet
//inside the public folder the css file and any images can be stored
app.use('/', express.static(__dirname + '/static/'));

app.get('/', function(req, res) {
    res.sendFile('index.html', viewOptions)
})

app.get('/login', function(req, res) {
    res.sendFile('login.html', viewOptions)
})


/*app.use(session({
  secret: 'keyboard cat',
  cookie: {  }
}));*/
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//noapp.use(require('connect-multiparty')());
app.use(cookieParser());
app.use(session({ secret: 'super-secret' }));

app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport, db);
//bodyParser will allow any post data to appear as a nice object 
//and can be referenced by req.body
require('./routes/routes.js')(app, passport);

var port = process.env.PORT || 3000;
db.sequelize.sync().then(function() {
    app.listen(port, function() {
        console.log('connected to', port);
    });
});
