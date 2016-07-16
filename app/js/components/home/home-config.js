angular.module('app.home', ['app.users'])
.config(['$stateProvider', HomeRouterConfig])
.controller('homeController', ['sessionService', 'userService', 'authorizeService', HomeController]);
