angular.module('app.login', ['app.auth', 'app.acl', 'ui.router'])
.config(['$stateProvider', LoginRouterConfig])
.controller('loginController', ['$scope', '$state', 'authenticationService', 'aclService', LoginController]);
