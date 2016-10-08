module.exports = function(app, passport){
	app.post('/login', function(req, res) {
		res.json({yes: 'yes'})
	});
	app.post('/register', passport.authenticate('local-signup'), function(req, res) {
		res.json(req.user);
	});
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