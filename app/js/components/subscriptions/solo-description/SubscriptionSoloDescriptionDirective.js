function SubscriptionSoloDescriptionDirective() {
  return {
    truc: 'AE',
    templateUrl: 'js/components/subscriptions/solo-description/subscription.description.html',
    controller: 'subscriptionSoloDescriptionController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
