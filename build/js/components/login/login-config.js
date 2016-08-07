angular.module('app.login', ['app.users', 'ui.router'])
.config(['$stateProvider', LoginRouterConfig])
.controller('loginController', ['$scope', '$state', 'identityService', LoginController]);
