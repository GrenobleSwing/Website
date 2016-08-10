function SubscriptionsListDirective() {
  return {
    restrict: 'E',
    templateUrl: 'js/components/subscriptions/list/subscriptions.list.html',
    controller: 'subscriptionsListController',
    controllerAs: 'ctrl'
  };
}
