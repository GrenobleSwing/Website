function RegistrationUpdateDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/member/registration/action/update/registration.update.html',
    controller: 'registrationUpdateController',
    controllerAs: 'ctrl',
    scope : {
      registration: "="
    }
  };
}
