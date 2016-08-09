angular.module('app.login', ['app.auth', 'app.users', 'ui.router'])
.config(['$stateProvider', LoginRouterConfig])
.controller('loginController', ['$scope', '$state', 'authenticationService', 'identityService', LoginController]);
