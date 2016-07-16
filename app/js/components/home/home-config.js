angular.module('app.home', ['app.users'])
.config(['$routeProvider', HomeRouteConfig])
.controller('homeController', ['sessionService', 'userService', 'authorizeService', HomeController]);
