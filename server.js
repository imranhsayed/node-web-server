// require the express library.
const express = require( 'express' );

/**
 * Make a new express app.
 * storing what is returned by express() int app variable.
 */
let app = express();

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
	res.send({
		name: 'Amy',
		age: 32,
		films: [ 'I', 'The Train' ]
	});
} );

app.get( '/about', ( req, res ) => {
	res.send( 'This is About Page' );
} );

app.get( '/contact', ( req, res ) => {
	res.send( 'This is Contact Page' );
} );

/**
 * app.listen() is going to bind this application to a port on ur machine
 * app.listen() takes an optional second param as a function which gets executed after the server is up.
 */
app.listen( 3000, () => {
	console.log( 'Server is up on Port 300' );
} );