function PasswordEditDirective() {
  return {
    restrict: 'A',
    templateUrl: 'components/password/password.edit.html',
    controller: 'passwordEditController',
    controllerAs: 'ctrl',
    scope : {
      user: "=gsPasswordEdit"
    }
  };
}
