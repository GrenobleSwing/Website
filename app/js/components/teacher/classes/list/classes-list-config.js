angular.module('app.classes.list', ['app.users', 'app.classes.common', 'ui.router'])
    .config(['$stateProvider', ClassesRouterConfig])
    .directive('gsClassesList', ClassesListDirective)
    .controller('classesListController', ['authenticationService', 'classService', ClassesListController]);
