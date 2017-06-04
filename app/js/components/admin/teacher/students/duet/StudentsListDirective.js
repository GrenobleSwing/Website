function StudentsListDirective() {
  return {
    restrict: 'A',
    templateUrl: 'components/teacher/students/list/students.list.html',
    controller: 'studentsListController',
    controllerAs: 'ctrl',
    scope : {
      class: "="
    }
  };
}
