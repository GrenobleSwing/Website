function SubscriptionsListDirective() {
  return {
    restrict: 'E',
    templateUrl: 'components/subscriptions/list/subscriptions.list.html',
    controller: 'subscriptionsListController',
    controllerAs: 'ctrl'
  };
}
