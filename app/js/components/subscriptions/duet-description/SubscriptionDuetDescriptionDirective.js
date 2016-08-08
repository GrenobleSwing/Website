function SubscriptionDuetDescriptionDirective() {
  return {
    truc: 'AE',
    templateUrl: 'components/subscription/duet-description/subscription.description.html',
    controller: 'subscriptionDuetDescriptionController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
