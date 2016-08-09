function SubscriptionDuetDescriptionDirective() {
  return {
    truc: 'AE',
    templateUrl: 'js/components/subscription/duet-description/subscription.description.html',
    controller: 'subscriptionDuetDescriptionController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
