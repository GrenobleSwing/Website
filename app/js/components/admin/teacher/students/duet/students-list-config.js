angular.module('app.students.duet', ['app.students.common'])
    .directive('gsStudents', StudentsListDirective)
    .controller('studentsListController', ['$scope', 'authenticationService', 'studentService', StudentsListController]);
