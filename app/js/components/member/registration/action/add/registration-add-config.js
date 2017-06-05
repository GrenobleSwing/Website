angular.module('app.registration.actions.add', ['ui.bootstrap'])
    .controller('registrationAddController', ['$scope', '$uibModal', RegistrationAddController])
    .directive('gsRegistrationAdd', RegistrationAddDirective);
