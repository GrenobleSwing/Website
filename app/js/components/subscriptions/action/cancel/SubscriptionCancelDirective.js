function SubscriptionCancelDirective() {
  return {
    restrict: 'AE',
    template: '<span ng-if="subscription.selected && subscription.state == \'waiting_for_payment\'"><a class="btn btn-primary" role="button" ng-disabled="!ctrl.isCancellable(subscription)" ng-click="ctrl.cancelSubscription(subscription)"><i class="glyphicon glyphicon-trash"></i></a></span>',
    controller: 'subscriptionCancelController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
