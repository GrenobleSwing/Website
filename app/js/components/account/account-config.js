angular.module('app.account', ['app.users', 'ngResource', 'ui.router'])
  .config(['$stateProvider', AccountRouterConfig])
  // .directive('gsAccountView', AccountViewDirective)
  .service('accountResource', ['$timeout', '$filter', '$q', '$resource', FakeAccountResource])
  .service('accountService', ['accountResource', AccountService])
  .controller('accountEditController', ['sessionService', 'accountService', AccountEditController]);
  // .controller('accountViewController', ['$scope', 'accountService', AccountViewController])
