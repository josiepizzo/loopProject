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
  cookie: {  }n
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


app.get('/survey', function(req, res) {
   if (req.user) {
    res.sendFile('survey.html', viewOptions) 
   } else {
    res.redirect('/login');
   }
   
});

app.get('/forum', function(req, res){
   res.sendFile('forum.html', viewOptions)
	});

app.get('/events', function(req, res){
   res.sendFile('events.html', viewOptions)
	});

app.get('/about', function(req, res){
   res.sendFile('about.html', viewOptions)
	});

app.post("/api/survey", function(req,res){
    console.log("I am about to update a user")
    console.log (req.user);
    console.log(req.body);
    //usertype: 'true', fname: 'nancy', lname: 'lucas', score: '75'
    var user = req.user;
    user.usertype = req.body.usertype;
    user.fname = req.body.fname;
    user.lname = req.body.lname;
    user.score = parseInt(req.body.score, 10);
    user.save().then(function() {
    	//Find all users, loop through the users, get the closest score
    	db.User.findAll({
    		where: {
    			usertype: {
    				$ne: user.usertype
    			},
    			id: {
    				$ne: user.id
    			},
    			paired: null
    		}
    	}).then(function(users) {
    		console.log('users', users);
    		if (users.length == 0) {
    			return res.send({matchedUser: null});
    		}
    		var matchedUser = users[0];
    		user.paired = matchedUser.id;
    		matchedUser.paired = user.id;
    		user.save().then(function() {
    			matchedUser.save().then(function() {
    				res.send({matchedUser: matchedUser});		
    			});
    		});
    	});
    });   
 });

    /*models.item.create({
        category:req.body.category,
        title: req.body.title,
        type: req.body.type,
        size: req.body.size,
        condition: req.body.condition,
        zipcode: req.session.user.zipcode,
        image: req.body.coaturl,
        donatorId: req.session.user.id
    }).then (function(data){
        console.log('data');
        res.redirect('/inventory');
    });*/