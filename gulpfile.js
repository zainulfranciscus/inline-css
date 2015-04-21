 var gulp = require('gulp'),
     inlineCss = require('gulp-inline-css');

 // file locations
var
	source = 'source/',
	dest = 'build/',
	html = source + "/**/*.html";

gulp.task('inline-css',function(){
	return gulp.src(html)
	       .pipe(inlineCss({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true
        		}))
		   .pipe(gulp.dest(dest));
});
// default task
gulp.task('default', ['inline-css'],function() {
	gulp.watch(html,['inline-css']);

});
