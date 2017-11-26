angular
    .module('app.logout', ['ui.router'])
    .config(['$stateProvider', LogoutRouterConfig])
    .controller('logoutController', ['$rootScope', '$cookies', '$state', '$http', 'config', LogoutController]);;
