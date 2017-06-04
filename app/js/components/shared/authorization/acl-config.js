angular.module('app.acl', [])
    .constant("roleMap", {
      'ROLE_USER' : {
          'role': 'ROLE_USER',
          'permissions' : ['canViewProfile', 'canViewSubscriptions'],
          'defaultState' : 'member.account'
      },
      'ROLE_TEACHER' : {
          'role': 'ROLE_TEACHER',
          'permissions' : ['canViewTopics', 'canViewClasses'],
          'defaultState' : 'admin.admin'
      },
      'ROLE_SECRETARY' : {
        'role': 'ROLE_SECRETARY',
        'permissions' : [],
        'defaultState' : 'admin.secretariat'
      },
      'ROLE_TREASURER' : {
          'role': 'ROLE_TREASURER',
          'permissions' : [],
          'defaultState' : 'admin.treasury'
      },
      'ROLE_ADMIN': {
        'role': 'ROLE_ADMIN',
        'permissions' : [],
        'defaultState' : 'index.home'
      }
    })
    .service('aclService', ['$q', 'roleMap', 'authenticationService', AclService]);
