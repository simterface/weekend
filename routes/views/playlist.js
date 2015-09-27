var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'playlist';

	// Load the songs
	view.query('songs', keystone.list('Songs').model.find());

	// Render the view
	view.render('playlist');
};
