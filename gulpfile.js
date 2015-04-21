 var gulp = require('gulp'),
     inlineCss = require('gulp-inline-css'),
     browsersync = require('browser-sync');

 // file locations
var
	source = 'source/',
	dest = 'build/',
	html = source + "/**/*.html",
	css = source + "/**/*.css";

var htmlAndCss = [html,css];

//this task will create inline css
var inlineCssOpts = {
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true
}

gulp.task('inline-css',function(){
	return gulp.src(htmlAndCss)
	       .pipe(inlineCss(inlineCssOpts))
		   .pipe(gulp.dest(dest))
		   .pipe(browsersync.reload({ stream: true }));
});

//this task will reload a browser using browser-sync
var syncOpts = {
	server: {
		baseDir: dest,
		index: 'index.html'
	},
	open: false,
	notify: true
};

gulp.task('browsersync', function() {
	browsersync(syncOpts);
});

// default task
gulp.task('default', ['inline-css','browsersync'],function() {
	gulp.watch(htmlAndCss,['inline-css',browsersync.reload]);

});
