function StudentsListDirective() {
  return {
    restrict: 'E',
    templateUrl: 'components/students/list/students.list.html',
    controller: 'studentsListController',
    controllerAs: 'ctrl'
  };
}
