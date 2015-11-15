var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);

	view.query('videos', keystone.list('Videos').model.find({
		enabled: true
	}).sort({
		priority: 1
	}).limit(3));
	view.query('songs', keystone.list('Songs').model.find());

	// Render the view
	view.render('index');

};
