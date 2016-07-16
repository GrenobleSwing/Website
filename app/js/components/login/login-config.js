angular.module('app.login', ['app.auth'])
.config(['$stateProvider', LoginRouterConfig])
.controller('loginController', ['$location', 'authenticationService', LoginController]);
