angular.module('app.students.solo', ['app.students.common'])
    .directive('gsStudentsSolo', StudentsSoloDirective)
    .controller('studentsSoloController', ['$scope', 'studentService', StudentsSoloController]);
