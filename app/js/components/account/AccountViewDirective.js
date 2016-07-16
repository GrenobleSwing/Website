function AccountViewDirective() {
  return {
    restrict: 'A',
    templateUrl: 'partials/account.view.html',
    controller: 'accountViewController',
    controllerAs: 'ctrl',
    scope : {
      user: "=gsAccountView"
    }
  };
}
