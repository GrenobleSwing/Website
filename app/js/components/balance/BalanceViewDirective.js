function BalanceViewDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'app/js/components/balance/balance.view.html',
    controller: 'BalanceViewController',
    controllerAs: 'ctrl'
  };
}
