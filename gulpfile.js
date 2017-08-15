var pkg = require("./package.json"),
  config = require('./gulp.config.js'),
  gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  inject = require('gulp-inject'),
  series = require('stream-series'),
  del = require('del'),
  connect = require('gulp-connect'),
  replace = require('gulp-string-replace'),
  templateCache = require('gulp-angular-templatecache');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Clean task
gulp.task('clean:build', function() {
  return del([
    config.build_dir.root
  ]);
});

gulp.task('clean:dist', function() {
  return del([
    config.dist_dir.root,
  ]);
});


// Concatenate JS
gulp.task('build', ['clean:build'], function() {

  // Concatenate styles
  var styleStream = series(gulp.src(config.app_files.styles), gulp.src(config.lib_files.styles))
    .pipe(gulp.dest(config.build_dir.css));

  var assetsStream = gulp.src(config.lib_files.assets)
    .pipe(gulp.dest(config.build_dir.fonts));

  // Concatenate vendor scripts
  var vendorStream = gulp.src(config.lib_files.js)
    .pipe(gulp.dest(config.build_dir.js.vendors));

  // Concatenate App JS
  var appStream = gulp.src(config.app_files.js);
  var configStream = gulp.src(config.app_files.configjs);
  var mainStream = gulp.src('app/js/main.js');

  var sourceStream = series(appStream, configStream, mainStream)
    .pipe(gulp.dest(config.build_dir.js.src));

  // Concatenate HTML templates
  var templates = gulp.src(config.app_files.tpl)
    .pipe(templateCache('templates.js', {
      module: 'app'
    }))
    .pipe(gulp.dest(config.build_dir.tpl));

  // Populate index.html with JS
  var htmlStream = gulp.src('app/index.html')
    .pipe(inject(series(styleStream, assetsStream, vendorStream, sourceStream, templates), {
      ignorePath: ['build', 'app'],
      addRootSlash: false,
      // addPrefix : 'gs'
    }))
    .pipe(gulp.dest(config.build_dir.root));


});

gulp.task('connect:build', function() {
  connect.server({
    root: config.build_dir.root,
    port: 8001,
    livereload: true
  });
});

// Concatenate and minify JS
gulp.task('dist', ['clean:dist'], function() {
  // Concatenate styles
  var styleStream = series(gulp.src(config.app_files.styles), gulp.src(config.lib_files.styles))
    .pipe(gulp.dest(config.dist_dir.css));

  var assetsStream = gulp.src(config.lib_files.assets)
    .pipe(gulp.dest(config.dist_dir.fonts));

  // Concatenate vendor scripts
  var vendorStream = gulp.src(config.lib_files.js)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(config.dist_dir.js));

  // Concatenate App JS
  var appStream = gulp.src(config.app_files.js);
  var configStream = gulp.src(config.app_files.configjs);
  var mainStream = gulp.src('app/js/main.js');

  // Concatenate HTML templates
  var templates = gulp.src(config.app_files.tpl)
    .pipe(templateCache('templates.js', {
      module: 'app'
    }));
    // .pipe(gulp.dest(config.dist_dir.tpl));

  var sourceStream = series(appStream, configStream, mainStream, templates)
    .pipe(concat('gs.js'))
    .pipe(gulp.dest(config.dist_dir.js))
    .pipe(rename('gs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist_dir.js));

  // Populate index.html with JS
  var htmlStream = gulp.src('app/index.html')
    .pipe(inject(series(styleStream, assetsStream, vendorStream, sourceStream, templates), {
      ignorePath: 'dist',
      addRootSlash: false,
      addPrefix : 'gs'
    }))
    .pipe(gulp.dest(config.dist_dir.root));
});

// Concatenate and minify JS
gulp.task('dist', ['clean:dist'], function() {
  // Concatenate styles
  var styleStream = series(gulp.src(config.app_files.styles), gulp.src(config.lib_files.styles))
    .pipe(gulp.dest(config.dist_dir.css));

  var assetsStream = gulp.src(config.lib_files.assets)
    .pipe(gulp.dest(config.dist_dir.fonts));

  // Concatenate vendor scripts
  var vendorStream = gulp.src(config.lib_files.js)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(config.dist_dir.js));

  // Concatenate App JS
  var appStream = gulp.src(config.app_files.js);
  var configStream = gulp.src(config.app_files.configjs);
  var mainStream = gulp.src('app/js/main.js');

  // Concatenate HTML templates
  var templates = gulp.src(config.app_files.tpl)
    .pipe(templateCache('templates.js', {
      module: 'app'
    }));
    // .pipe(gulp.dest(config.dist_dir.tpl));

  var sourceStream = series(appStream, configStream, mainStream, templates)
    .pipe(concat('gs.js'))
    .pipe(replace(new RegExp('@API_URL@', 'g'), 'http://localhost/api'))
    .pipe(gulp.dest(config.dist_dir.js))
    .pipe(rename('gs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist_dir.js));

  // Populate index.html with JS
  var htmlStream = gulp.src('app/index.html')
    .pipe(inject(series(styleStream, assetsStream, vendorStream, sourceStream, templates), {
      ignorePath: 'dist',
      addRootSlash: false,
      addPrefix : 'gs'
    }))
    .pipe(gulp.dest(config.dist_dir.root));
});

// Concatenate and minify JS
gulp.task('dist-test', ['clean:dist'], function() {
  // Concatenate styles
  var styleStream = series(gulp.src(config.app_files.styles), gulp.src(config.lib_files.styles))
    .pipe(gulp.dest(config.dist_dir.css));

  var assetsStream = gulp.src(config.lib_files.assets)
    .pipe(gulp.dest(config.dist_dir.fonts));

  // Concatenate vendor scripts
  var vendorStream = gulp.src(config.lib_files.js)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(config.dist_dir.js));

  // Concatenate App JS
  var appStream = gulp.src(config.app_files.js);
  var configStream = gulp.src(config.app_files.configjs);
  var mainStream = gulp.src('app/js/main.js');

  // Concatenate HTML templates
  var templates = gulp.src(config.app_files.tpl)
    .pipe(templateCache('templates.js', {
      module: 'app'
    }));
    // .pipe(gulp.dest(config.dist_dir.tpl));

  var sourceStream = series(appStream, configStream, mainStream, templates)
    .pipe(concat('gs.js'))
    .pipe(replace(new RegExp('@API_URL@', 'g'), 'http://localhost/api'))
    .pipe(gulp.dest(config.dist_dir.js))
    .pipe(rename('gs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist_dir.js));

  // Populate index.html with JS
  var htmlStream = gulp.src('app/index.html')
    .pipe(inject(series(styleStream, assetsStream, vendorStream, sourceStream, templates), {
      ignorePath: 'dist',
      addRootSlash: false,
      addPrefix : 'gs'
    }))
    .pipe(gulp.dest(config.dist_dir.root));
});

// Concatenate and minify JS
gulp.task('dist-prod', ['clean:dist'], function() {
  // Concatenate styles
  var styleStream = series(gulp.src(config.app_files.styles), gulp.src(config.lib_files.styles))
    .pipe(gulp.dest(config.dist_dir.css));

  var assetsStream = gulp.src(config.lib_files.assets)
    .pipe(gulp.dest(config.dist_dir.fonts));

  // Concatenate vendor scripts
  var vendorStream = gulp.src(config.lib_files.js)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(config.dist_dir.js));

  // Concatenate App JS
  var appStream = gulp.src(config.app_files.js);
  var configStream = gulp.src(config.app_files.configjs);
  var mainStream = gulp.src('app/js/main.js');

  // Concatenate HTML templates
  var templates = gulp.src(config.app_files.tpl)
    .pipe(templateCache('templates.js', {
      module: 'app'
    }));
    // .pipe(gulp.dest(config.dist_dir.tpl));

  var sourceStream = series(appStream, configStream, mainStream, templates)
    .pipe(concat('gs.js'))
    .pipe(replace(new RegExp('@API_URL@', 'g'), 'http://localhost/api'))
    .pipe(gulp.dest(config.dist_dir.js))
    .pipe(rename('gs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist_dir.js));

  // Populate index.html with JS
  var htmlStream = gulp.src('app/index.html')
    .pipe(inject(series(styleStream, assetsStream, vendorStream, sourceStream, templates), {
      ignorePath: 'dist',
      addRootSlash: false,
      addPrefix : 'gs'
    }))
    .pipe(gulp.dest(config.dist_dir.root));
});

gulp.task('connect:dist', ['dist'], function() {
  connect.server({
    root: config.dist_dir.root,
    port: 8001,
    livereload: true
  });
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('js/**.js', ['lint', 'scripts']);
});

gulp.task('default', ['lint', 'build', 'watch']);
