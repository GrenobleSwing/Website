angular.module('app.registration.actions.cancel', ['ui.bootstrap', 'ui.router', 'app.config'])
    .controller('registrationCancelController', ['$scope', '$http', '$state', 'config', RegistrationCancelController])
    .directive('gsRegistrationCancel', RegistrationCancelDirective);
