angular.module('app.balance', ['app.users'])
  .directive('gsBalanceView', BalanceViewDirective)
  .controller('balanceViewController', ['usersService', BalanceViewController]);
