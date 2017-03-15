function SubscriptionsListDirective() {
  return {
    restrict: 'E',
    templateUrl: 'components/member/subscriptions/list/subscriptions.list.html',
    controller: 'subscriptionsListController',
    controllerAs: 'ctrl'
  };
}
