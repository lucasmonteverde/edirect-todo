const router = require('express').Router(),
	{ check, validationResult } = require('express-validator/check'),
	JWT = require('jsonwebtoken'),
	ACL = require('libs/acl'),
	messages = require('config/messages'),
	User = require('mongoose').model('User');

const debug = require('debug')('app:auth');

const getUser = (email, password) => {
	return User
		.findOne({ email: email })
		.select('+password')
		.then( user => {
				
			if ( ! user ) {
				throw new Error( messages.auth.USER_NOT_FOUND );
			} else if ( ! user.active ) {
				throw new Error( messages.auth.USER_INATIVE );
			}
			
			if ( ! user.comparePassword(password) ) {
				throw new Error( messages.auth.WRONG_PASSWORD );
			} else {
				return user;
			}
		});
};

const processToken = user => {
	debug('user', user);

	return JWT.sign({
		name: user.name,
		email: user.email,
		roles: ACL.get(user.role),
	}, process.env.JWT_SECRET, {
		audience: process.env.JWT_AUDIENCE,
		issuer: process.env.JWT_ISSUER,
		subject: user._id.toString(),
		expiresIn: '7d'
	});
};

router.post('/token', [
	check('email')
		.trim()
		.escape()
		.normalizeEmail()
		.isEmail().withMessage(messages.validation.EMAIL),

	check('password', messages.validation.PASSWORD)
		.trim()
		.escape()
		.isLength({ min: 5 })
], async (req, res, next) => {

	try {
		validationResult(req).throw();

		const user = await getUser(req.body.email, req.body.password);

		res.json({
			status: true,
			token: processToken(user)
		});
	} catch (err) {
		err.status = 401;
		next(err);
	}
});

router.post('/register', [
	check('name', messages.validation.NAME)
		.isLength({ min: 2 })
		.trim()
		.escape(),

	check('email', messages.validation.EMAIL)
		.trim()
		.escape()
		.normalizeEmail(),

	check('password', messages.validation.PASSWORD)
		.trim()
		.escape()
		.isLength({ min: 5 })
], async (req, res, next) => {

	try {
		validationResult(req).throw();

		const user = await User.register(req.body);
		
		res.status(201).json({
			status: true,
			token: processToken(user)
		});

	} catch ( err) {
		err.status = 403;
		next(err);
	}

});

/* router.post('/refresh', (req, res) => {

	const optionKeys = ['iat', 'nbf', 'exp', 'aud', 'iss', 'sub'];

	res.json({
		status: true,
		token: JWT.sign(_.omit(req.user, optionKeys), process.env.JWT_SECRET, {
			audience: process.env.JWT_AUDIENCE,
			issuer: process.env.JWT_ISSUER,
			subject: req.user.sub,
			expiresIn: '7d'
		})
	});
}); */

router.get('/me', (req, res) => res.json(req.user) );

module.exports = router;