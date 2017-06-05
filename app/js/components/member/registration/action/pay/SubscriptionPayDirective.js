function SubscriptionPayDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/member/subscriptions/action/pay/subscription.pay.html',
    controller: 'subscriptionPayController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
