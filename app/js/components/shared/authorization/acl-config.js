angular.module('app.acl', [])
    .constant("roleMap", {
      'ROLE_USER' : {
          'role': 'ROLE_USER',
          'permissions' : ['canViewProfile', 'canViewSubscriptions'],
          'defaultState' : 'member.account'
      }
    })
    .service('aclService', ['$q', 'roleMap', 'authenticationService', AclService]);
