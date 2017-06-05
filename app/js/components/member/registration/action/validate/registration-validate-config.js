angular.module('app.registration.actions.validate', [])
    .controller('registrationValidateController', ['$scope', '$uibModal',  RegistrationValidateController])
    .directive('gsRegistrationValidate', RegistrationValidateDirective);
