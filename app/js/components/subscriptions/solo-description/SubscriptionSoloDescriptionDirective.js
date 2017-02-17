function SubscriptionSoloDescriptionDirective() {
  return {
    restrict: 'AE',
    require: '^subscriptionsListDirective',
    templateUrl: 'components/subscriptions/solo-description/subscription.description.html',
    controller: 'subscriptionSoloDescriptionController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
