const express = require('express'),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	helmet = require('helmet'),
	logger = require('morgan'),
	cors = require('cors'),
	jwt = require('express-jwt'),
	pkg = require('./package.json'),
	fs = require('fs'),
	app = express();
	
require('config/db');

app.use(logger('dev'));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const options = app.get('env') === 'production' ? {
	maxAge: '1y',
	setHeaders: res => {
		res.set('Cache-Control', 'public, max-age=2592000');
	}
} : {};

app.use(express.static('dist', options));

app.use(jwt({
	secret: process.env.JWT_SECRET,
	audience: process.env.JWT_AUDIENCE,
	issuer: process.env.JWT_ISSUER
}).unless({
	path: ['/', /^\/auth\/token/, /^\/auth\/register/]
}));

app.use((req, res, next) => {
	res.set('X-Api-Version', pkg.version);
	next();
});

//load all controllers on router controller name
fs.readdirSync('./app/controllers').forEach(ctrl => {
	app.use('/' + ctrl.replace(/\.js|index/g, ''), require('controllers/' + ctrl));
});

app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => { // eslint-disable-line
	
	if ( ! err.status || err.status >= 500 ) {
		console.error( 'App Error', err.message, err.stack );
	}

	//express-validation messages formatter
	if ( err && err.message === 'Validation failed' ) {
		err.message = err.array().map(item => ({
			field: item.param,
			message: item.msg
		}) );
	}
	
	res.status( err.status || 500 ).json({
		status: false,
		message: err.message || err
	});
});

app.listen( process.env.PORT || 3000 );

module.exports = app;