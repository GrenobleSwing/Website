function StudentsListDirective() {
  return {
    restrict: 'E',
    templateUrl: 'components/teacher/students/list/students.list.html',
    controller: 'studentsListController',
    controllerAs: 'ctrl'
  };
}
