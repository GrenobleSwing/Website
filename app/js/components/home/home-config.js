angular.module('app.home', ['app.users', 'ui.router'])
.config(['$stateProvider', HomeRouterConfig])
.controller('homeController', ['sessionService', 'userService', 'authorizeService', HomeController]);
