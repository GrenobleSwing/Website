function RegistrationAddDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/member/registration/action/add/registration.add.html',
    controller: 'registrationAddController',
    controllerAs: 'ctrl',
    scope : {
      registration: "="
    }
  };
}
