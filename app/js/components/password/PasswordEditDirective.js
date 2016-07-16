function PasswordEditDirective() {
  return {
    restrict: 'A',
    templateUrl: 'partials/password.edit.html',
    controller: 'passwordEditController',
    controllerAs: 'ctrl',
    scope : {
      user: "=gsPasswordEdit"
    }
  };
}
