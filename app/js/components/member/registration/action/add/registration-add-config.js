angular.module('app.registration.actions.add', ['ui.bootstrap', 'ui.router'])
    .controller('registrationAddController', ['$scope', '$uibModal', '$state', RegistrationAddController])
    .directive('gsRegistrationAdd', RegistrationAddDirective);
