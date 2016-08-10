function SubscriptionsAmountDirective() {
  return {
    restrict: 'AE',
    template: '<div>{{ctrl.amount}}</div>',
    // templateUrl: 'js/components/subscriptions/amount/subscriptions.summary.html',
    controller: 'subscriptionsSummaryController',
    controllerAs: 'ctrl'
  };
}
