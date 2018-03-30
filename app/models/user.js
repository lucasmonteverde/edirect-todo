'use strict';

const mongoose = require('mongoose'),
	bcrypt = require('bcryptjs'),
	messages = require('config/messages');

const schema = new mongoose.Schema({
	name: { 
		type: String, 
		trim: true, 
		required: true
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	active: {
		type: Boolean,
		default: true
	},
	lastLogin: Date,
	role: {
		type: String,
		default: 'user',
		enum: ['admin', 'user']
	}
}, {
	collection: 'users',
	timestamps: true
});

schema.method('setPassword', function(next) {
	bcrypt.hash(this.password, 10, (err, hash) => {
		if (err) return next(err);

		this.password = hash;
		
		next(null, hash);
	});
});

schema.method('comparePassword', function(candidatePassword) {
	return bcrypt.compareSync(candidatePassword, this.password);
});

schema.statics.register = function(user) {
	
	if ( !( user instanceof this) ) {
		user = new this(user);
	}

	return this.findOne({ email: user.email })
		.then(function(existingUser) {
			
			if (existingUser) {
				throw new Error(messages.validation.EXISTS);
			}
			
			return user.save();
		});
};

schema.pre('save', function(next) {
	if ( ! this.isModified('password') ) return next();
	
	this.setPassword(next);
});

schema.post('save', (error, doc, next) => {
	if ( error.name === 'MongoError' && error.code === 11000 ) { //duplicated
		next(new Error(messages.validation.EXISTS));
	} else {
		next(error);
	}
});

module.exports = mongoose.model('User', schema);