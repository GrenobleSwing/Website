angular.module('app.account', ['app.config','app.users', 'permission', 'permission.ui', 'ui.router'])
  .config(['$stateProvider', AccountRouterConfig])
  .service('accountResource', ['$http', 'config', AccountResource])
  .service('accountService', ['accountResource', AccountService])
  .controller('accountEditController', ['identityService', 'accountService', AccountEditController]);
