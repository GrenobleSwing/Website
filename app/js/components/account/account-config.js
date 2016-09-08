angular.module('app.account', ['app.config','app.users', 'ui.router'])
  .config(['$stateProvider', AccountRouterConfig])
  // .service('accountResource', ['$timeout', '$filter', '$q', '$resource', FakeAccountResource])
  .service('accountResource', ['$http', 'config', AccountResource])
  .service('accountService', ['accountResource', AccountService])
  .controller('accountEditController', ['identityService', 'accountService', AccountEditController]);
