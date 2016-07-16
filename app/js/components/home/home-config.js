angular.module('app.home', [])
.config(['$routeProvider', HomeRouteConfig])
.controller('homeController', ['currentUserService', HomeController]);
