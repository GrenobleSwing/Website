function SubscriptionSoloDescriptionDirective() {
  return {
    restrict: 'AE',
    require: '^subscriptionsListDirective',
    templateUrl: 'components/member/subscriptions/solo-description/subscription.description.html',
    controller: 'subscriptionSoloDescriptionController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
