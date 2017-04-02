function SubscriptionCancelDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/member/subscriptions/action/cancel/subscription.cancel.html',
    controller: 'subscriptionCancelController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
