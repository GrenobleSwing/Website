angular.module('app.account', ['app.users', 'ngResource'])
  .directive('gsAccountView', AccountViewDirective)
  .service('accountResource', ['$timeout', '$filter', '$q', '$resource', FakeAccountResource])
  .service('accountService', ['accountResource', AccountService])
  .controller('accountViewController', ['$scope', 'accountService', AccountViewController]);
