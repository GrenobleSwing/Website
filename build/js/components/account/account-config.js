angular.module('app.account', ['app.users', 'ngResource', 'ui.router'])
  .config(['$stateProvider', AccountRouterConfig])
  .service('accountResource', ['$timeout', '$filter', '$q', '$resource', FakeAccountResource])
  .service('accountService', ['accountResource', AccountService])
  .controller('accountEditController', ['identityService', 'accountService', AccountEditController]);
