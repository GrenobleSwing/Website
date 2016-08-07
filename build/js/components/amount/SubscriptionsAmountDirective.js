function SubscriptionsAmountDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/amount/subscriptions.summary.html',
    controller: 'subscriptionsSummaryController',
    controllerAs: 'ctrl'
  };
}
