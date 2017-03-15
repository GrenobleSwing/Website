function SubscriptionDuetDescriptionDirective() {
  return {
    restrict: 'AE',
    require: '^subscriptionsListDirective',
    templateUrl: 'components/member/subscriptions/duet-description/subscription.description.html',
    controller: 'subscriptionDuetDescriptionController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
