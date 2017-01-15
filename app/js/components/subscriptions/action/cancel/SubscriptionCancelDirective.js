function SubscriptionCancelDirective() {
  return {
    truc: 'AE',
    template: '<span ng-if="subscription.selected && subscription.state == \'waiting_for_payment\'"><a class="btn btn-primary" role="button" ng-disabled="!ctrl.isCancellable(subscription)" ng-click="ctrl.cancelSubscription(subscription)"><i class="glyphicon glyphicon-trash"></i> supprimer</a></span>',
    controller: 'subscriptionCancelController',
    scope : {
      subscription: "="
    }
  };
}
