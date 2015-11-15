/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {

	var locals = res.locals;

	// Icon bootstrap 3 class for icon
	locals.navLinks = [
		{ label: 'Видео',		key: 'demos',		href: '#demos', icon: 'glyphicon-film', sectionIndex: '2' },
		{ label: 'Фото',		key: 'photo',		href: '#photos', icon: 'glyphicon-camera', sectionIndex: '3' },
		{ label: 'Репертуар',		key: 'playlist',		href: '#playlist', icon: 'glyphicon-music', sectionIndex: '4' },
		{ label: 'Бэнд',		key: 'band',		href: '#band', icon: 'glyphicon-star-empty', sectionIndex: '5' }
	];

	locals.user = req.user;

	next();

};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};

	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;

	next();

};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {

	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}

};
