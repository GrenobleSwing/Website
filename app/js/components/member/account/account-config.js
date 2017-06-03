// angular.module('app.account.edit', ['app.config','app.users', 'permission', 'permission.ui', 'ui.router'])
//  .config(['$stateProvider', AccountEditRouterConfig])
//  .service('accountResource', ['$http', 'config', AccountResource])
//  .service('accountService', ['accountResource', AccountService])
//  .controller('accountEditController', ['authenticationService', 'accountService', AccountEditController]);

angular.module('app.account', ['app.config', 'ui.router', 'ngSanitize'])
  .config(['$stateProvider', AccountRouterConfig])
  .controller('accountController', ['$http', 'config', 'userDetails', '$sce', AccountController]);
