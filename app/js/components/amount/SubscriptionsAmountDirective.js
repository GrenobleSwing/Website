function SubscriptionsAmountDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'partials/subscriptions.summary.html',
    controller: 'subscriptionsSummaryController',
    controllerAs: 'ctrl'
  };
}
