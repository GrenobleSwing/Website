function StudentsListDirective() {
  return {
    restrict: 'A',
    templateUrl: 'components/students/list/students.list.html',
    controller: 'studentsListController',
    controllerAs: 'ctrl',
    scope : {
      class: "="
    }
  };
}
