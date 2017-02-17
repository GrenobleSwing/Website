function SubscriptionDuetDescriptionDirective() {
  return {
    restrict: 'AE',
    require: '^subscriptionsListDirective',
    templateUrl: 'components/subscriptions/duet-description/subscription.description.html',
    controller: 'subscriptionDuetDescriptionController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
