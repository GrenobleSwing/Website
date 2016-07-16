angular
    .module('app.logout', ['app.auth'])
    .controller('logoutController', ['$location', 'authenticationService', LogoutController]);
