angular
  .module('app.identity', ['app.auth', 'app.config', 'sdt.models'])
  .constant("roleStore", {
    'ROLE_MEMBER' : ['canViewProfile', 'canViewSubscriptions'],
    'ROLE_TEACHER' : ['canViewTopics', 'canViewClasses']
  })
  .service('identityResource', ['$http', 'config', IdentityResource])
  .service('identityService', ['$cookies', '$q', 'identityResource', 'authResource', '$timeout', 'ObserverService', 'roleStore', IdentityService]);
