'use strict';

const gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	eslint = require('gulp-eslint');
	
require('dotenv').config({ silent: true });

gulp.task('lint', () => {
	return gulp.src(['server.js', 'app/**/*.js'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
});

gulp.task('express', () => {
	return nodemon({
		script: 'server.js',
		ext: 'js',
		watch: ['app','server.js'],
		tasks: ['lint']
	})
	.on('restart', () => console.log('restarted!') );
});

gulp.task('default', [ 'express', 'lint' ]);