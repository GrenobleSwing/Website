function SubscriptionUpdateDirective() {
  return {
    truc: 'AE',
    template: '<span ng-if="subscription.selected && subscription.state == \'waiting_for_payment\' && subscription.type === \'duet\'"><a class="btn btn-primary" role="button" ng-disabled="!ctrl.isUpdatable(subscription)" ng-click="ctrl.updateSubscription(subscription)"><i class="glyphicon glyphicon-edit"></i> modifier</a></span>',
    controller: 'subscriptionUpdateController',
    scope : {
      subscription: "="
    }
  };
}
