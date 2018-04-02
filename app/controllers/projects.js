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

			res.status(201).json(result);

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
				res.json(result);
			}
			
		})
		.catch( err => next(err) );
	})
	.delete( (req, res, next) => {
		Model.findOneAndRemove({
			_id: req.params.id,
			owner: req.user.sub
		})
		.then( result => res.status(result ? 200 : 404).json(result ? {
			status: true,
			message: 'deleted'
		} : 'not found') )
		.catch( err => next(err) );
	});

router.route('/:id/tasks')
	.put( async(req, res, next) => {

		try {
			const result = await Model.findOne({
				_id: req.params.id,
				owner: req.user.sub
			});

			if ( ! result ) {
				let err = new Error('not found');
				err.status = 404;
				throw err;
			}

			let task;

			if ( req.body._id ) {
				task = result.tasks.id(req.body._id).set(req.body);
			} else {
				task = result.tasks.create(req.body);
				result.tasks.push(task);
			}

			await result.save();

			res.json(task);
		} catch ( err ) {
			next(err);
		}
	});

router.route('/:id/tasks/:task').delete( async(req, res, next) => {
	try {
		const result = await Model.findOne({
			_id: req.params.id,
			owner: req.user.sub
		});

		if ( ! result ) {
			let err = new Error('not found');
			err.status = 404;
			throw err;
		}

		result.tasks.id(req.params.task).remove();

		await result.save();

		res.json({
			status: true,
			message: 'deleted'
		});
	} catch ( err ) {
		next(err);
	}
});

module.exports = router;