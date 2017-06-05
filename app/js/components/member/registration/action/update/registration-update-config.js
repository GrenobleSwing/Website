angular.module('app.registration.actions.update', ['ui.bootstrap'])
    .controller('registrationUpdateController', ['$scope', '$uibModal', RegistrationUpdateController])
    .directive('gsRegistrationUpdate', RegistrationUpdateDirective);
