function SubscriptionAddDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/member/subscriptions/action/add/subscription.add.html',
    controller: 'subscriptionAddController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
