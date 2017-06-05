angular.module('app.students.list', ['app.students.common', 'ui.router'])
    .config(['$stateProvider', StudentsRouterConfig])
    .directive('gsStudentsList', StudentsListDirective)
    .controller('studentsListController', ['authenticationService', 'studentService', StudentsListController]);