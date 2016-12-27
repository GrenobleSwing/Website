function SubscriptionAddDirective() {
  return {
    truc: 'AE',
    template: '<span ng-if="!ctrl.subscription.selected"><a class="btn btn-primary" role="button" ng-click="ctrl.validateSubscription()">ajouter</a></span>',
    controller: 'subscriptionAddController',
    scope : {
      subscription: "="
    }
  };
}
