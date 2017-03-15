function SubscriptionUpdateDirective() {
  return {
    restrict: 'AE',
    template: '<span ng-if="subscription.selected && subscription.state == \'waiting_for_payment\' && subscription.type === \'duet\'"><a class="btn btn-primary" role="button" ng-disabled="!ctrl.isUpdatable(subscription)" ng-click="ctrl.updateSubscription(subscription)"><h5>Modifier <i class="glyphicon glyphicon-edit"></h5></i></a></span>',
    controller: 'subscriptionUpdateController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
