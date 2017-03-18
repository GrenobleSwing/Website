angular
  .module('app.identity', ['app.auth', 'app.config', 'sdt.models'])
  .service('identityResource', ['$http', 'config', IdentityResource])
  .service('identityService', ['$cookies', '$q', 'identityResource', 'authResource', '$timeout', 'ObserverService', IdentityService]);
