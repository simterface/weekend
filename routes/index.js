/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

var isProduction = process.env.NODE_ENV === 'production';

// Setup Route Bindings
exports = module.exports = function(app) {

	// Views
	app.get('/', routes.views.index);

	// proxy to webpack-dev-server when not in production
	// TODO: move the code into separate file
	if(!isProduction) {
		var httpProxy = require('http-proxy');
		var proxy = httpProxy.createProxyServer({
			changeOrigin: true
		});

		var bundle = require('./webpack_bundler.js');
		bundle();
		app.all('/build/*', function(req, res) {
			proxy.web(req, res, {
				target: 'http://localhost:8000'
			});
		});

		proxy.on('error', function(e) {
			console.log('Could not connect to webpack proxy ... ');
		});
	}

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
