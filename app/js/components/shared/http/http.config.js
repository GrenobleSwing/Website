angular.module('app.http', [])
  .factory('httpInterceptor', ['$q', '$injector', HttpInterceptor])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }]);
