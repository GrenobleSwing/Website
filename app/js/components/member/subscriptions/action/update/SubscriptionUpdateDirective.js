function SubscriptionUpdateDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/member/subscriptions/action/update/subscription.update.html',
    controller: 'subscriptionUpdateController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
