function RegistrationValidateDirective() {
  return {
    restrict: 'AE',
    template: '<span><a class="btn btn-primary" role="button" ng-click="ctrl.showForm()"><h5>Valider <i class="glyphicon glyphicon-plus-sign"></h5></a></span>',
    controller: 'registrationValidateController',
    controllerAs: 'ctrl',
    scope : {
      registration: "="
    }
  };
}
