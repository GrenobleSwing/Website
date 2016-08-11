function SubscriptionsAmountDirective() {
  return {
    restrict: 'E',
    template: '<div>{{ctrl.amount}}</div>',
    controller: 'subscriptionsSummaryController',
    controllerAs: 'ctrl'
  };
}
