angular.module('app', ['ngCookies', 'ui.bootstrap', 'ngResource',
        'ui.router', 'permission', 'permission.ui',
        'ngMessages',
        'app.account',
        'app.acl',
        'app.admin',
        'app.admin.nav',
        'app.admin.secretariat',
        'app.admin.treasury',
        'app.auth',
        'app.classes.common',
        'app.classes.list',
        'app.cnil',
        'app.common',
        'app.config',
        'app.home',
        'app.http',
        'app.identity',
        'app.invoice.request',
        'app.login',
        'app.logout',
        'app.main.nav',
        'app.member.nav',
        'app.password.common',
        'app.password.edit',
        'app.password.forgot',
        'app.password.reset',
        'app.signup',
        'app.students.common',
        'app.students.duet',
        'app.students.solo',
        'app.subscriptions.amount',
        'app.subscriptions.actions.add',
        'app.subscriptions.actions.update',
        'app.subscriptions.actions.cancel',
        'app.subscriptions.common',
        'app.subscriptions.list',
        'app.subscriptions.description.duet',
        'app.subscriptions.description.solo',
        'app.subscriptions.duet.dialog',
        'app.summary',
        'app.topic.common',
        'app.topic.edit',
        'app.topic.list',
        'app.users',
        'app.year',
        'pascalprecht.translate',
        'rorymadden.date-dropdowns',
        'sdt.models'
    ])
    .config(['$stateProvider', '$urlRouterProvider', DefaultRouteConfig])
    .config(['$translateProvider', TranslateConfiguration]);

function DefaultRouteConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            abstract: true,
            url: '/',
            views: {
                'nav@': {
                    template: ''
                },
                'content@': {
                    template: ''
                }
            },
            data: {
                permissions: {
                  only: ['ANONYMOUS']
                }
            }
        })
        .state('member', {
            abstract: true,
            views: {
                'nav@': {
                    templateUrl: 'components/member-navigation/navbar.html',
                    controller: 'memberNavController',
                    controllerAs: 'ctrl'
                }
            },
            data: {
                permissions: {
                  only: ['ROLE_MEMBER']
                }
            }
        })
        .state('admin', {
            abstract: true,
            views: {
                'nav@': {
                    templateUrl: 'components/admin-navigation/navbar.html',
                    controller: 'adminNavController',
                    controllerAs: 'ctrl'
                }
            },
            data: {
                permissions: {
                  only: ['ROLE_TEACHER', 'ROLE_SECREATARY', 'ROLE_TREASURER']
                }
            }
        })
        .state('access-denied', {
            url: '/denied',
            views: {
                'nav':  {
                    template: ''
                },
                'content@': {
                    template: '<alert type="danger"><strong>Access Denied</strong><p>You don\'t have permission to see this. <a href="" ui-sref="index.home">Return home.</a></p></alert>'
                }
            },
            data: {
                requireLogin: false,
                roles: [],
                permissions: {
                  except: ['ANONYMOUS']
                }
            }
        });

    $urlRouterProvider.otherwise( function($injector) {
      var $state = $injector.get("$state");
      $state.go('index.login');
    });
}

function run($rootScope, $state, $stateParams, authService, identityService) {
    identityService.getIdentity(true).then(function(data) {
        console.info("run - getIdentity succeeded...");
    }, function(error) {
        console.info("run - getIdentity failed...");
        identityService.clearIdentity();
        $state.go('index.login');
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;
        if (identityService.isAuthenticated()) {
            authService.authorize();
        }
    });
}

// function withPermissions(PermPermissionStore) {
//   var permissions = ['listMeeting', 'seeMeeting', 'editMeeting', 'deleteMeeting'];
//
//   PermPermissionStore.defineManyPermissions(permissions, /*@ngInject*/ function (permissionName) {
//     return _.contains(permissions, permissionName);
//   });
// }

function withRoles(PermRoleStore, identityService, $q) {
  PermRoleStore
    // Or use your own function/service to validate role
    .defineManyRoles({
      'ANONYMOUS'      : function (stateParams, roleName) {
           var deferred = $q.defer();

           identityService.getIdentity().then(function (data) {
             deferred.reject();
           }, function () {
             // Error with request
             deferred.resolve();
           });

           return deferred.promise;
       },
      'AUTHORIZED'     : function (stateParams, roleName) { return identityService.getIdentity(); },
      'ROLE_MEMBER'    : function (stateParams, roleName) {
        return IdentityService.hasRole(roleName);
      },
      'ROLE_TEACHER'   : function (stateParams, roleName) {
        return IdentityService.hasRole(roleName);
      },
      'ROLE_SECRETARY' : function (stateParams, roleName) {
        return IdentityService.hasRole(roleName);
      },
      'ROLE_TREASURER' : function (stateParams, roleName) {
        return IdentityService.hasRole(roleName);
      }
    });
}

angular
  .module('app')
  .run(['$rootScope', '$state', '$stateParams', 'authorizationService', 'identityService', run])
  .run(['PermRoleStore', 'identityService', '$q', withRoles]);
