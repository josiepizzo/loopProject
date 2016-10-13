module.exports = function(app, passport, db){
	app.post('/login', passport.authenticate('local-login'), function(req, res) {
    console.log('user', req.user);
    res.send(200, req.user);
  });
	console.log('__dirname', __dirname);
	var viewOptions = {
    root: __dirname + '/../static/views'
}

	
  app.post('/register', function(req, res, next) {
    console.log('body', req.body);
    next(null);
  }, passport.authenticate('local-signup'), function(req, res) {
    res.send(200, req.user);
  });
	
  app.get('/logout', function(req, res) {
		req.logout();
		res.status(200).end();
	});

  app.get('/user', function(req, res) {
    res.send(req.user);
  });

  app.get('/services', function(req, res){
   res.sendFile('survey.html', viewOptions)
	});




	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.status(404).end();
		}
	}
}