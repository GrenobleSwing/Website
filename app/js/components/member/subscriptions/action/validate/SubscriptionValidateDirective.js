function SubscriptionValidateDirective() {
  return {
    restrict: 'AE',
    template: '<span ng-if="!ctrl.subscription.selected"><a class="btn btn-primary" role="button" ng-click="ctrl.validateSubscription()"><h5>Ajouter <i class="glyphicon glyphicon-plus-sign"></h5></a></span>',
    controller: 'subscriptionAddController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
