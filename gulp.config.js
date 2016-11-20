module.exports = {
  build_dir: {
      root: 'build',
      js: {
          src: 'build/js/src',
          vendors: 'build/js/vendors'
      },
      tpl: 'build/js/assets',
      css: 'build/css',
      fonts: 'build/fonts'
  },
  dist_dir: {
      root: 'dist',
      js: 'dist/js',
      css: 'dist/css'
  },
  app_files: {
    js: [
      'app/js/**/*.js',
      '!app/js/main.js',
      '!app/js/**/*.spec.js',
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
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-bootstrap/ui-bootstrap.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-ui-grid/ui-grid.js',
      'bower_components/bootstrap/js/bootstrap.js',
    ],
    styles: [
      'bower_components/bootstrap/dist/css/bootstrap.css',
      'bower_components/angular-ui-grid/ui-grid.css',
      'bower_components/angular-ui-grid/ui-grid.ttf',
      'bower_components/angular-ui-grid/ui-grid.woff'
    ],
    assets: [
      'bower_components/bootstrap/fonts/**'
    ]
  }
};
