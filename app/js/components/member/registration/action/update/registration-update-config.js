angular.module('app.registration.actions.update', ['ui.bootstrap', 'ui.router'])
    .controller('registrationUpdateController', ['$scope', '$uibModal', '$state', RegistrationUpdateController])
    .directive('gsRegistrationUpdate', RegistrationUpdateDirective);
