angular.module('app.login', ['app.auth'])
.config(['$routeProvider', LoginRouteConfig])
.controller('loginController', ['$location', 'authenticationService', LoginController]);
