  angular.module('app.reset', ['app.config', 'ui.router', 'ngSanitize'])
    .config(['$stateProvider', PasswordResetRouterConfig])
    .controller('passwordResetController', ['$http', 'config', '$scope', '$sce', 'content', '$compile', PasswordResetController]);
