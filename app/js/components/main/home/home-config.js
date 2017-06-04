angular.module('app.home', ['ui.router'])
.config(['$stateProvider', HomeRouterConfig])
.controller('homeController', [HomeController]);
