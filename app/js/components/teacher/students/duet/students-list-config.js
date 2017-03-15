angular.module('app.students.duet', ['app.users', 'app.students.common'])
    .directive('gsStudents', StudentsListDirective)
    .controller('studentsListController', ['$scope', 'identityService', 'studentService', StudentsListController]);
