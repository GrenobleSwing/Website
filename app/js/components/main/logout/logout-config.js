angular
    .module('app.logout', ['app.config', 'ui.router', 'app.auth'])
    .config(['$stateProvider', LogoutRouterConfig])
    .controller('logoutController', ['$rootScope', '$cookies', '$state', '$http', 'config', 'authenticationService', LogoutController]);
