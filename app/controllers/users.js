'use strict';

const router = require('express').Router(),
	ACL = require('libs/acl'),
	Model = require('mongoose').model('User');

router.all('*', ACL.isAdmin);

router.route('/')
	.get( (req, res, next) => {

		Model
			.find( req.query )
			.sort('-id')
			.lean()
			.then( items => {
				res.set('Total-Count', items && items.length);
				res.json(items);
			})
			.catch( err => next(err) );
	})
	.delete( (req, res, next) => {
		Model.remove()
			.then( () => res.json({
				message: 'deleted'
			}) )
			.catch( err => next(err) );
	})
	.post( (req, res, next) => {

		const item = new Model(req.body);

		item.save()
			.then( result => res.status(201).json({
				id: result.id,
				message: 'created'
			}) )
			.catch( err => next(err) );
	});

router.route('/:id')
	.get( (req, res, next) => {

		Model.findById( req.params.id )
			.lean()
			.then( result => res.status(result ? 200 : 404).json(result) )
			.catch( err => next(err) );
	})
	.put( (req, res, next) => {

		Model.findById(req.params.id)
			.then( result => {
				
				if ( ! result ) {
					let err = new Error('not found');
					err.status = 404;

					throw err;
				} else {
					Object.assign(result, req.body);
					return result.save();
				}
				
			})
			.then( () => res.json({
				id: req.params.id,
				message: 'updated'
			}) )
			.catch( err => next(err) );
	})
	.delete( (req, res, next) => {
		Model.findByIdAndRemove( req.params.id )
			.then( result => res.status(result ? 200 : 404).json(result ? {
				message: 'deleted'
			} : 'not found') )
			.catch( err => next(err) );
	});

module.exports = router;