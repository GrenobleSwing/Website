angular.module('app.registrations.list', ['ui.router', 'app.config'])
    .config(['$stateProvider', RegistrationsRouterConfig])
//    .directive('gsRegistrations', RegistrationsListDirective)
    .controller('registrationsListController', ['$http', 'config', 'userDetails', 'year', RegistrationsListController]);
