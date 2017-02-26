angular.module('app', ['ngCookies', 'ui.bootstrap', 'ngResource',
        'ui.router', 'permission', 'permission.ui',
        'ngMessages',
        'app.account',
        // 'app.acl',
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
            url: '/login',
            data: {
                permissions: {
                  only: ['ANONYMOUS']
                }
            }
        })
        .state('member', {
            abstract: true,
            url: '/home',
            views: {
                'nav@': {
                    templateUrl: 'components/member-navigation/navbar.html',
                    controller: 'memberNavController',
                    controllerAs: 'ctrl'
                }
            },
            data: {
                permissions: {
                  only: ['ROLE_MEMBER'],
                  redirectTo: 'access-denied'
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
                  only: ['ROLE_TEACHER', 'ROLE_SECRETARY', 'ROLE_TREASURER'],
                  redirectTo: 'access-denied'
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
            }
        })
        .state('404', {
            url: '/error',
            views: {
                'nav':  {
                    template: ''
                },
                'content@': {
                    template: '<alert type="danger"><strong>Erreur 404</strong><p></p></alert>'
                }
            }
        });

    $urlRouterProvider.otherwise( function($injector) {
      var $state = $injector.get("$state");
      $state.go('404', null, { location: false });
    });
}

function run($rootScope, $state, $stateParams, identityService) {
    if (!identityService.isAuthenticated()) {
        $state.go('index.login');
    }

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;
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
           return !identityService.isAuthenticated();
       },
      'AUTHORIZED'     : function (stateParams, roleName) {
        return identityService.isAuthenticated();
      },
      'ROLE_MEMBER'    : function (stateParams, roleName) {
        return identityService.isInRole(roleName);
      },
      'ROLE_TEACHER'   : function (stateParams, roleName) {
        return identityService.isInRole(roleName);
      },
      'ROLE_SECRETARY' : function (stateParams, roleName) {
        return IdentityService.isInRole(roleName);
      },
      'ROLE_TREASURER' : function (stateParams, roleName) {
        return IdentityService.isInRole(roleName);
      }
    });
}

angular
  .module('app')
  .run(['$rootScope', '$state', '$stateParams', 'identityService', run])
  .run(['PermRoleStore', 'identityService', '$q', withRoles]);
