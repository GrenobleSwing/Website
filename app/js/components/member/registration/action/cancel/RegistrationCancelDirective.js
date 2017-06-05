function RegistrationCancelDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/member/registration/action/cancel/registration.cancel.html',
    controller: 'registrationCancelController',
    controllerAs: 'ctrl',
    scope : {
      registration : "="
    }
  };
}
