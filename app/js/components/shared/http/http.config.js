angular.module('app.http', [])
  .service('httpInterceptor', ['$q', HttpInterceptor])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }]);
