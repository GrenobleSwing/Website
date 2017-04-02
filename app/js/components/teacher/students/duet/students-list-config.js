angular.module('app.students.duet', ['app.users', 'app.students.common'])
    .directive('gsStudents', StudentsListDirective)
    .controller('studentsListController', ['$scope', 'authenticationService', 'studentService', StudentsListController]);
