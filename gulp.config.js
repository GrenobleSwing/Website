module.exports = {
  build_dir: {
      root: 'build',
      js: 'build/js',
      css: 'build/css'
  },
  dist_dir: {
      root: 'dist',
      js: 'dist/js',
      css: 'dist/css'
  },
  app_files: {
    js: [
      'app/js/**/*.js',
      '!app/js/**/*-config.js'
    ],
    configjs: [
      'app/js/**/*-config.js'
    ],
    tpl: [
      'app/js/**/*.html'
    ],
    html: [
      'app/index.html'
    ],
    styles: [
      'app/styles/main.css'
    ]
  },
  lib_files: {
    js: [
      'bower_components/angular/angular.js',
      'bower_components/angular-bootstrap/ui-bootstrap.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/bootstrap/js/bootstrap.js',
    ],
    styles: [
      'bower_components/bootstrap/dist/css/bootstrap.css',
    ],
    assets: [
      'bower_components/bootstrap/fonts/**'
    ]
  }
};
