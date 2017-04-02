angular.module('app.students.list', ['app.users', 'app.students.common', 'ui.router'])
    .config(['$stateProvider', StudentsRouterConfig])
    .directive('gsStudentsList', StudentsListDirective)
    .controller('studentsListController', ['authenticationService', 'studentService', StudentsListController]);
