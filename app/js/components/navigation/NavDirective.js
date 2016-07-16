function NavDirective() {
  return {
    restrict: 'A',
    templateUrl: 'partials/nav.html',
    controller: 'navController',
    controllerAs: 'ctrl'
  };
}
