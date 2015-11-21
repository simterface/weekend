var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);

	view.query('videos', keystone.list('Videos').model.find({
		enabled: true
	}).sort({
		priority: 1
	}).limit(3));
	view.query('images', keystone.list('Images').model.find({
		enabled: true
	}).sort({
		priority: 1
	}).limit(9));
	view.query('songs', keystone.list('Songs').model.find());
	view.query('musicians', keystone.list('Musicians').model.find(
		{enabled: true}
	).sort(
		{priority: 1}
	));

	// Render the view
	view.render('index');

};
