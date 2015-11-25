 var gulp = require('gulp'),
     inlineCss = require('gulp-inline-css'),
     browsersync = require('browser-sync')
     mail = require('gulp-mail');

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

//send mail:

var smtpInfo = {
  auth: {
    user: '[enter an email address]',
    pass: '[password for that email]'
  },
  host: 'smtp.gmail.com',
  secureConnection: true,
  port: 465
}

gulp.task('mail', function() {
  return gulp.src(dest + 'index.html')
    .pipe(mail({
      subject: 'Surprise!?',
      to: [
        'zainul.franciscus@gmail.com' 
      ],
      from: 'Foo <foo@163.com>',
      smtp: smtpInfo
    }))
})


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
