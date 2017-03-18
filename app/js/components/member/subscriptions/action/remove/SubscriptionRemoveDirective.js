function SubscriptionRemoveDirective() {
  return {
    restrict: 'AE',
    template: '<span ng-if="subscription.selected && subscription.state == \'waiting_for_payment\'"><a class="btn btn-primary" role="button" ng-disabled="!ctrl.isCancellable(subscription)" ng-click="ctrl.cancelSubscription(subscription)"><h5>Supprimer <i class="glyphicon glyphicon-trash"></i></h5></a></span>',
    controller: 'subscriptionRemoveController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}
