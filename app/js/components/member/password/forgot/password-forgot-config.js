  angular.module('app.password.forgot', ['app.config', 'ui.router', 'ngMessages', 'app.password.common'])
    .config(['$stateProvider', PasswordForgotRouterConfig])
    .controller('passwordForgotController', ['passwordService', PasswordForgotController]);
