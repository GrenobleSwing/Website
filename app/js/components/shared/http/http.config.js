angular.module('app.http', [])
  .factory('httpInterceptor', ['$q', '$location', HttpInterceptor])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }]);
