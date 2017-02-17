function StudentsSoloDirective() {
  return {
    restrict: 'A',
    templateUrl: 'components/students/solo/students.solo.html',
    controller: 'studentsSoloController',
    controllerAs: 'ctrl',
    scope : {
      class: "="
    }
  };
}
