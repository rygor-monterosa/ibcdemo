/* 
 * Node modules
 */

var fs          = require('fs'),
	gulp        = require('gulp'),
	plumber     = require('gulp-plumber'),
	util        = require('gulp-util'),
	filter      = require('gulp-filter'),
	concat      = require('gulp-concat'),
	connect     = require('gulp-connect'),
	template    = require('gulp-template'),
	less        = require('gulp-less'),
	jshint      = require('gulp-jshint'),
	stylish     = require('jshint-stylish'),
	livereload  = require('gulp-livereload'),
	modrewrite  = require('connect-modrewrite'),
	localtunnel = require('localtunnel');


/* 
 * Read package file
 * Some variables are taken from this file
 */

var pkg = JSON.parse(fs.readFileSync('package.json'));


/* 
 * Global options
 */

var options = {
	port: 8080,
	plumber: {
		errorHandler: function (err) {
			util.beep();
			util.log(util.colors.red(err.toString()));
			this.emit('end');
		}
	},
    jshint: {
        forin: true,
        noarg: true,
        noempty: true,
        bitwise: false,
        undef: true,
        unused: true,
        curly: true,
        browser: true,
        jquery: true,
        maxerr: 20
    }
};


/* 
 * Detects errors and potential problems in code.
 */

gulp.task('hint', function() {
    return gulp.src(['src/js/**/*.js', "!src/js/lib/**/*.*"])
        .pipe(jshint(options.jshint))
        .pipe(jshint.reporter(stylish));
});


/* 
 * Builds scripts that including:
 *
 *  1. Bower components
 *  2. Custom scripts from src/js/ folder
 *
 * Feel free to use any superset of JS: TypeScript, CoffeeScript, etc.
 */

gulp.task('scripts', ['hint'], function() {

	var bowerComponents = [
		'bower_components/jquery/dist/jquery.js'
	];

	// Libraries
	gulp.src(bowerComponents)
		.pipe(plumber(options.plumber))
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('dist/assets/js/'));

	// Scripts
	gulp.src(['src/js/lib/**/*.*', 'src/js/**/*.js'])
		.pipe(plumber(options.plumber))
		.pipe(concat('main.js' ))
		.pipe(gulp.dest('dist/assets/js'))
		.pipe(livereload());

});


/* 
 * This task builds styles that include:
 * 
 *  1. Bower components
 *  2. Custom scripts from src/js/ folder
 *
 * We've chosen LESS preprocessor and LESS Hat as mixin library for you. 
 * But you free to set up any preprocessor of your choice: scss/compass, 
 * stylus, autoprefixer, etc.
 */

gulp.task('styles', function() {
	return gulp.src('src/styles/main.less')
		.pipe(plumber(options.plumber))
		.pipe(less())
		.pipe(gulp.dest('dist/assets/styles'))
		.pipe(livereload());
});


/* 
 * Copy assets
 */

gulp.task('copy', ['copy:html', 'copy:config', 'copy:images']);


/* 
 * Precompile templates using (Lo-Dash/Underscore templates syntax)
 */

gulp.task('copy:html', function () {
	return gulp.src(['src/html/**'])
		.pipe(plumber(options.plumber))
		.pipe(template(pkg))
		.pipe(gulp.dest('dist'))
		.pipe(livereload());
});


/* 
 * Copy config files required for Studio
 */

gulp.task('copy:config', function () {
	pkg.url = '//' + pkg.name + '.localtunnel.me';

	var specFilter = filter('lvis/spec.json', {restore: true});

	return gulp.src(['src/config/**'])
		.pipe(plumber(options.plumber))
		.pipe(specFilter)
		.pipe(template(pkg))
		.pipe(specFilter.restore)
		.pipe(gulp.dest('dist/config'));
});


/* 
 * Copy images
 */

gulp.task('copy:images', function() {
	return gulp.src('src/images/**/*')
		.pipe(gulp.dest('dist/assets/images'))
});



/* 
 * Runs HTTP server using middleware `modrewrite` plugins.
 * Node's modrewrite plugin works exactly as Apache's mod_rewrite module
 * Here we proxy all requests from /<pkg_name>/<version>/* to /*.
 */

gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		port: options.port,
		middleware: function () {
			return [
				modrewrite([
					'^/' + pkg.name + '/.*?/(.*)$ /$1 [L]'
				])
			];
		}
	});
});


/* 
 * Exposes local HTTP server to the public.
 * Your web page will be available at //<pkgname>.localtunnel.me
 */

gulp.task('localtunnel', ['connect'], function () {
	var tunnel = localtunnel(options.port, {subdomain: pkg.name}, function(err, tunnel) {
		if (err) {
			util.log(util.colors.red(err.toString()));
		} else {
			util.log('Assigned public url: ' + util.colors.bgBlue.white(tunnel.url));
		}
	});
});


/* 
 * Watches for all changes
 */

gulp.task('watch', function () {
	livereload.listen();

	gulp.watch('src/html/**/*.html', ['copy:html']);
	gulp.watch('src/config/**/*', ['copy:config']);
	gulp.watch('src/images/*', ['copy:images']);
	gulp.watch('src/styles/*', ['styles']);
	gulp.watch('src/js/**/*.js', ['scripts'] );
});

gulp.task('default', ['copy', 'styles', 'scripts', 'connect', 'localtunnel', 'watch']);

