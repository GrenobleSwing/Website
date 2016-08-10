function SubscriptionDuetDescriptionDirective() {
  return {
    truc: 'AE',
    require: '^subscriptionsListDirective',
    templateUrl: 'js/components/subscriptions/duet-description/subscription.description.html',
    controller: 'subscriptionDuetDescriptionController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
