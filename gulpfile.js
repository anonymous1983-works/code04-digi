'use strict';

(function() {


/**
 * Libs
 **/
  var gulp        = require('gulp');
  var replace     = require('gulp-replace');
  var gutil       = require('gulp-util');
  var less        = require('gulp-less');
  var jshint      = require('gulp-jshint');
  var stylish     = require('jshint-stylish');
  var karma       = require('gulp-karma');
  var connect     = require('gulp-connect');
  var open        = require('gulp-open');
  var inject      = require('gulp-inject');
  var concat      = require('gulp-concat');
  var bowerFiles  = require('main-bower-files');
  var filter      = require('gulp-filter');
  var series      = require('stream-series');
  var uglify      = require('gulp-uglify');
  var cssmin      = require('gulp-minify-css');
  var rename      = require('gulp-rename');
  var protractor  = require('gulp-protractor').protractor;
  var ngAnnotate  = require('gulp-ng-annotate');

/**
 * Env
 **/
  var baseUrl     = './www/';
  var dist        = './digicode-war/src/main/webapp';
  var ignoreDevPath = 'www/';
  var ignorePath  = 'digicode-war/src/main/webapp';
  var bowerPath   = './www/bower_components';
  var env = {
    port: 9000,
    baseHtml: 'index.html',
    distHtml: dist + '/index.html',
    less: {
      src: baseUrl + 'assets/src/less/style.less',
      files: baseUrl + 'assets/src/less/**/*.less',
      dest: baseUrl + 'assets/src/css'
    },
    css: {
      src: baseUrl + 'assets/src/css/*.css'
    },
    js: {
      main: baseUrl + 'assets/src/js/app.js',
      src: baseUrl + 'assets/src/js/**/*.js',
      spec: baseUrl + 'assets/src/js/**/*.spec.js'
    },
    tests: {
      angularmocks: bowerPath + '/angular-mocks/angular-mocks.js'
    },
    etoe: {
      src: baseUrl + 'etoe',
      exe: ''
    }
  };
  var bowerOptions = {
    base: bowerPath,
    options: {
      paths: {
        bowerDirectory: 'bower_components',
        bowerrc: '.bowerrc',
        bowerJson: 'bower.json'
      }
    }
  };


/******************************************************************************
*
* BUILD
*
*******************************************************************************/
  gulp.task('build', [
    'less',
    'uglify',
    'cssmin',
    'buildinject',
    'otherFiles'
  ], function() {
    return gutil.log('!=== Build done !!!===!');
  });

  // uglify js files and concat them to app.min.js
  gulp.task('uglify', function() {
    var files   = bowerFiles(bowerOptions);
    var js      = gulp.src([env.js.main, env.js.src, '!' + env.js.spec]);

    return gulp.src(files)
      .pipe(series(js))
      .pipe(filter('*.js'))
      .pipe(concat('app.min.js'))
      .pipe(ngAnnotate())
      .pipe(uglify({mangle: false}))
      .pipe(gulp.dest(dist + '/min'));
  });

  // minify css files
  gulp.task('cssmin', function() {
    return gulp.src(env.css.src)
      .pipe(cssmin())
      .pipe(rename({
          suffix: '.min'
      }))
      .pipe(gulp.dest(dist + '/min'));
  });

  // inject minified files to index
  gulp.task('buildinject', function() {
    var opt = {
      ignorePath: ignorePath,
      addRootSlash: false
    };
    return gulp.src(env.distHtml)
     .pipe(replace(/<!-- (.*?):js -->([\S\s]*?)<!-- endinject -->/gmi, '<!-- $1:js -->\n<!-- endinject -->'))
     .pipe(replace(/<!-- (.*?):css -->([\S\s]*?)<!-- endinject -->/gmi, '<!-- $1:css -->\n<!-- endinject -->'))
     .pipe(inject(gulp.src(dist + '/min/assets/**/*.min.css'), opt))
     .pipe(inject(gulp.src(dist + '/min/*.min.js'), opt))
     .pipe(gulp.dest(dist));
  });

  // copy other files to dist
  gulp.task('otherFiles', function () {
    return gulp.src([
        baseUrl + '/**/*',
        '!' + baseUrl + '/**/*.{js,less}',
        '!' + env.baseHtml
      ])
      .pipe(gulp.dest(dist));
  });

/******************************************************************************
*
* Unit tests
*
*******************************************************************************/
  gulp.task('test', ['less', 'jshint', 'inject'], function() {
    var files = bowerFiles(bowerOptions);
    files.push(env.tests.angularmocks);
    files.push(env.js.src);
    return gulp.src(files)
      .pipe(filter('*.js'))
      .pipe(karma({
        configFile: 'karma.conf.js',
        action: 'run'
      }))
      .on('error', function(err) {
        throw err;
      });
  });

/******************************************************************************
*
* End to end tests
*
*******************************************************************************/
// install : npm install -g protractor
// puis : webdriver-manager update --proxy http://proxyweb:8080
  gulp.task('etoe', ['less', 'jshint', 'inject'], function() {
    connect.server({
      port: env.port
    });
    return gulp.src([env.etoe.src + '/**/*.js'])
      .pipe(protractor({
        configFile: env.etoe.src + '/conf.js',
        args: ['--baseUrl', 'http://localhost:' + env.port]
      }))
      .on('error', function(err) {
        throw err;
      })
      .on('end', function() {
        connect.serverClose();
      });
  });

/******************************************************************************
*
* DEV
*
*******************************************************************************/
  gulp.task('default', [
    'less',
    'inject',
    'connect',
    'watches'
  ], function() {
    return gutil.log('!=== App running on localhost:'+ env.port +' ===!');
  });

  // jshint
  gulp.task('jshint', function() {
    return gulp.src(env.js.src)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  });

  // less compile
  gulp.task('less', function() {
    return gulp.src(env.less.src)
               .pipe(less())
               .pipe(gulp.dest(env.less.dest));
  });

  // connect local server
  gulp.task('connect', function() {
    connect.server({
      port: env.port,
      root: 'www',
      livereload: true
    });
    return gulp.src(baseUrl + env.baseHtml)
      .pipe(open('', {url: 'http://localhost:' + env.port}));
  });

  // reload app
  gulp.task('reload', function() {
    return gulp.src(baseUrl + env.baseHtml)
      .pipe(connect.reload());
  });

  // inject files
  gulp.task('inject', function() {
    var vendor  = gulp.src(bowerFiles(bowerOptions), {read: false});
    var css     = gulp.src(env.css.src, {read: false});
    var mainapp = gulp.src(env.js.main);
    var js      = gulp.src([env.js.src, '!' + env.js.spec, '!' + env.js.main]);

    var opt = {
      ignorePath: ignoreDevPath
    };

    var bowerOpt = {
      ignorePath: ignoreDevPath,
      name: 'bower'
    };

    return gulp.src(baseUrl + env.baseHtml)
      .pipe(inject(vendor, bowerOpt))
      .pipe(inject(css, opt))
      .pipe(inject(series(mainapp, js), opt))
      .pipe(gulp.dest(baseUrl));

  });

/**
 * Watches
 **/
  gulp.task('watches', function() {
    gulp.watch(env.less.files, ['less', 'inject', 'reload']);
    gulp.watch(env.js.src, ['inject', 'reload']);
  });

})();