function SubscriptionAddDirective() {
  return {
    restrict: 'AE',
    template: '<span ng-if="!ctrl.subscription.selected"><a class="btn btn-primary" role="button" ng-click="ctrl.validateSubscription()"><i class="glyphicon glyphicon-plus-sign"></a></span>',
    controller: 'subscriptionAddController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
