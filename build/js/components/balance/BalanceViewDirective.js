function BalanceViewDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/balance/balance.view.html',
    controller: 'BalanceViewController',
    controllerAs: 'ctrl'
  };
}
