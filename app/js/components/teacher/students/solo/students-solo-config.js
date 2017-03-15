angular.module('app.students.solo', ['app.users', 'app.students.common'])
    .directive('gsStudentsSolo', StudentsSoloDirective)
    .controller('studentsSoloController', ['$scope', 'studentService', StudentsSoloController]);
