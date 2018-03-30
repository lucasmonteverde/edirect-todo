'use strict';

module.exports = {
	admin: {
		project: true,
		task: true,
		user: true
	},
	user: {
		project: ['read', 'update'],
		task: ['read', 'update']
	}
};