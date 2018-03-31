const router = require('express').Router(),
	{ check, validationResult } = require('express-validator/check'),
	messages = require('config/messages'),
	Model = require('mongoose').model('Project');

router.route('/')
	.get( (req, res, next) => {

		Model
			.find({ owner: req.user.sub })
			.lean()
			.then( items => {
				res.set('Total-Count', items && items.length);
				res.json(items);
			})
			.catch( err => next(err) );
	})
	.post( [
		check('name', messages.validation.NAME)
			.trim()
			.escape()
			.isLength({ min: 2 })
	], async (req, res, next) => {

		try {
			validationResult(req).throw();
		
			const result = await new Model({ ...req.body, owner: req.user.sub }).save();

			res.status(201).json({
				id: result.id,
				message: 'created',
				result
			});

		} catch (err ) {
			next(err);
		}
	});

router.route('/:id')
	.get( (req, res, next) => {

		Model.findOne( {
			_id: req.params.id,
			owner: req.user.sub
		})
		.lean()
		.then( result => res.status(result ? 200 : 404).json(result) )
		.catch( err => next(err) );
	})
	.put( (req, res, next) => {

		/*if ( req.body.task ) {
			_.set(req.body, '$addToSet.tasks', req.body.task);
		} */

		Model.findOneAndUpdate({
			_id: req.params.id,
			owner: req.user.sub
		}, req.body, {
			new: true,
			runValidators: true
		})
		.then( result => {
			
			if ( ! result ) {
				let err = new Error('not found');
				err.status = 404;

				throw err;
			} else {
				res.json({
					id: result._id,
					message: 'updated',
					result
				});
			}
			
		})
		.catch( err => next(err) );
	});

router.route('/:id/tasks')
	.put( (req, res, next) => {

		Model.findOne( {
			_id: req.params.id,
			owner: req.user.sub
		})
		.then( result => {

			if ( ! result ) {
				let err = new Error('not found');
				err.status = 404;

				throw err;
			} else {

				if ( req.body.id ) {
					result.tasks.id(req.body.id).set(req.body);
				} else {
					result.tasks.push(req.body);
				}

				return result.save();
			}
			
		})
		.then( result => res.json({
			id: result.id,
			message: 'updated',
			result
		}) )
		.catch( err => next(err) );
	});

module.exports = router;