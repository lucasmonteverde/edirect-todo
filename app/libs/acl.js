'use strict';

const roles = require('config/roles');

function isAdmin( req, res, next ) {
	const admin = req.user && req.user.role === 'admin';

	return next ? next( admin ? null : permissionError() ) : admin;
}

function isAllowed( action, resource, roles ) {

	if ( roles ) {
		
		const can = roles[resource];

		if ( can === true ) return true;

		if ( typeof action === 'string' ) action = [action];

		return action.every( act => can.includes(act) );
		
	} else {
		return false;
	}
}

function can(action, resource) {
	
	return function(req, res, next) {
		
		const allowed = req.user && isAllowed(action, resource, req.user.roles);
		
		if ( next ) { //middleware
			
			if ( allowed ) {
				return next();
			} else {
				return next(permissionError());
			}
			
		} else {
			return allowed;
		}
	};
}

function get(role) {
	return role && roles[role];
}

function permissionError() {
	let err = new Error('O usuário não tem permissão para executar esta ação neste recurso.');
	err.status = 403;
	return err;
}

module.exports = { can, isAllowed, isAdmin, get, permissionError };