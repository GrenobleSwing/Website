angular.module('app.login', ['app.auth', 'ui.router'])
.config(['$stateProvider', LoginRouterConfig])
.controller('loginController', ['$location', 'authenticationService', LoginController]);
