angular.module('app.http', [])
  .service('httpInterceptor', ['$q', HttpInterceptor])
  .config(['$httpProvider', 'httpInterceptor', function($httpProvider, httpInterceptor) {
    $httpProvider.interceptors.push(httpInterceptor);
  }]);
