  angular.module('app.password.reset', ['app.config', 'app.users', 'ui.router', 'ngMessages', 'app.password.common'])
    .config(['$stateProvider', PasswordResetRouterConfig])
    .controller('passwordResetController', ['passwordService', PasswordResetController]);
