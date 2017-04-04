angular.module('app.http', [])
  .factory('httpInterceptor', ['$q', '$injector', '$cookies', HttpInterceptor])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }]);
