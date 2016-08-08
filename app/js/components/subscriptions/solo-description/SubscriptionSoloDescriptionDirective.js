function SubscriptionSoloDescriptionControllerDirective() {
  return {
    truc: 'AE',
    templateUrl: 'components/subscription/solo-description/subscription.description.html',
    controller: 'subscriptionSoloDescriptionController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
