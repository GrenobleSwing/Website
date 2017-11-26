angular
    .module('app.logout', ['app.config', 'ui.router'])
    .config(['$stateProvider', LogoutRouterConfig])
    .controller('logoutController', ['$rootScope', '$cookies', '$state', '$http', 'config', LogoutController]);
