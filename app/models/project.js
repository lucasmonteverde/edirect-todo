'use strict';

const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const schema = new Schema({
	name: { 
		type: String, 
		trim: true, 
		required: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	tasks: [{
		name: {
			type: String,
			trim: true,
			required: true
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		finishedAt: Date
	}]
}, {
	collection: 'projects',
	timestamps: true
});

/*schema.static('filter', function( request) {

	const filter = request.query;

	return this
		.find( filter.search || {} )
		.sort( (filter.order === 'asc' ? '' : '-') + ( filter.sort || '_id' ) )
		.limit( + (filter.limit || 1000) )
		.skip( +(filter.offset || filter.start) );
});*/

module.exports = mongoose.model('Project', schema);