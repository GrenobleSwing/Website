angular.module('app.registrations.list', ['ui.router', 'app.config'])
    .config(['$stateProvider', RegistrationsRouterConfig])
    .controller('registrationsListController', ['$q', '$http', 'config', 'userDetails', 'year', RegistrationsListController]);
