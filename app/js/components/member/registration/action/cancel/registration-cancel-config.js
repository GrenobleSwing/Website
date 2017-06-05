angular.module('app.registration.actions.cancel', ['ui.bootstrap'])
    .controller('registrationCancelController', ['$scope', '$uibModal',  RegistrationCancelController])
    .directive('gsRegistrationCancel', RegistrationCancelDirective);
