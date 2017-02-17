  angular.module('app.password.forgot', ['app.config', 'app.users', 'ui.router', 'ngMessages', 'app.password.common'])
    .config(['$stateProvider', PasswordForgotRouterConfig])
    .controller('passwordForgotController', ['passwordService', PasswordForgotController]);
