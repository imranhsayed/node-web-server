// require the express, hbs and fs library.
const express = require( 'express' );
const hbs = require( 'hbs' );
const fs = require( 'fs' );

/**
 * Grab a port from process.env (which is an object that store all of our environment variables as key:value pairs), called PORT,
 * which heroku is going to set and set this PORT equal to port const.
 * And if the process.env.PORT does not exist will set port equal to 3000
 */
const  port = process.env.PORT || 3000;

/**
 * Make a new express app.
 * storing what is returned by express() int app variable.
 */
let app = express();

/**
 * hbs.registerPartials will let node know that we want to use partials for handlebars templates.
 * We need to specify the absolute path to the directory in which we will keep all our partials as its par
 */
hbs.registerPartials( __dirname + '/views/partials' );

/**
 * registerHelper() are used to pass variables e.g. getCurrentYear to handlebar templates and their value will be equal
 * to what is returned by the call back function here, in this case year
 */
hbs.registerHelper( 'getCurrentYear', () => {
	return new Date().getFullYear();
} );

/**
 * registerHelper() are used to pass variables e.g. screamOut to handlebar templates and their value will be equal
 * to what is returned by the call back function here, in this case text in uppercase.
 * You can also pass a variable to this call back function like we have passed text here and it will be available in hbs templates
 * as {{ varName anotherVar }} e.g. {{ screamOut welcomeMessage }}
 */
hbs.registerHelper( 'screamOut', ( text ) => {
	return text.toUpperCase();
} );

/**
 * Sets express related configuration.
 * We will set a key value pair here.
 * 'view engine' is the key and the value is 'hbs', meaning the view engine we want to use is hbs.
 */
app.set( 'view engine', 'hbs' );

/**
 * Here we have defined another middleware using app.use(), which takes the req object, spits out some info
 * like time of the request, request method(get/post) and request url( /, or /home or /about )
 * next() is used when the middleware request is complete. If you don't call next() your application will never fire.
 */
app.use( ( req, res, next ) => {
	// Date().toString() returns the formatted date string.
	let now = new Date().toString();

	/**
	 * req.method gives you which HTTP method was used ( GET or POST ).
	 * req.url gives you what url was accessed. ( /, or /home, or /about etc )
	 */
	let log =  `${ now }: ${ req.method } ${ req.url }`;
	console.log( log );

	/**
	 * fs.appendFile() lets you add on to a file.
	 * Here server.log is the filename we want to append/write to, if this file does not exist it will create one, else it will
	 * append our message stored in log variable at the end of the file.
	 * It also takes a call back function if which executes if the file appending fails.
	 */
	fs.appendFile( 'server.log', log + '\n', ( err ) => {
		if ( err ) {
		    console.log( 'Unable to append to server.log' );
		}
	} );
	next();
} );

/**
 * Create a middleware using app.use().
 * Anyone who lands to the any url on your site will see content rendered by maintenance.hbs template and will not
 * be allowed to continue on
 */
// app.use( ( req, res, next ) => {
// 	res.render( 'maintenance.hbs' );
// } );

/**
 * Define a middleware using app.use()
 * app.use() will make the page help.html available at http://localhost:3000/help.html url without having to create a route for it
 * express.static() takes the absolute path that you want to serve up as its param
 * __dirname returns the root url
 */
app.use( express.static( __dirname + '/public' ) );

/**
 * Set up handler for http get request
 * first parameter is url , '/' means home/root url.
 * req is request variable and has all the request data, like headers, body etc
 * res is response that has a lot of methods available so that you can respond to the HTTP request in a way you like.
 */
app.get( '/', ( req, res ) => {
	// What ever you pass it here will be displayed on the http://localhost:3000
	// res.send( '<h1>Hello express!</h1>' );
	res.render( 'home.hbs', {
		pageTitle: 'About Page',
		welcomeMessage: 'Welcome to home page'
	} )
} );

/**
 * Here res.render() will render the about.hbs page
 * You can also pass an object as a second argument to res.render(), which will contain data that will be available to
 * handlebar template about.hbs
 */
app.get( '/about', ( req, res ) => {
	res.render( 'about.hbs', {
		pageTitle: 'About Page',
	} );
} );

app.get( '/contact', ( req, res ) => {
	res.send( 'This is Contact Page' );
} );

/**
 * app.listen() is going to bind this application to a port on ur machine
 * app.listen() takes an optional second param as a function which gets executed after the server is up.
 */
app.listen( port, () => {
	console.log( `Server is up on Port: ${port}` );
} );