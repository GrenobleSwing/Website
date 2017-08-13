angular.module('app', ['ngCookies', 'ui.bootstrap', 'ngResource',
        'ui.router', 'permission', 'permission.ui', 'ngSanitize',
        'ngMessages',
        'app.acl',
        'app.auth',
        'app.common',
        'app.config',
        'app.home',
        'app.account',
        'app.http',
        'app.login',
        'app.logout',
        'app.main.nav',
        'app.member.nav',
        'app.summary',
        'app.password.edit',
        'app.payment',
        'app.signup',
        'app.registration',
        'app.reset',
        'app.year',
        'pascalprecht.translate',
        'angular-cookie-law'
    ])
    .config(['$stateProvider', '$urlRouterProvider', DefaultRouteConfig])
    .config(['$translateProvider', TranslateConfiguration]);

function DefaultRouteConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            abstract: true,
            url: '',
            views: {
              'nav@': {
                  template: ''
              },
              'header@':  {
                  template: ''
              }
            }
        })
        .state('member', {
            abstract: true,
            url: '/member',
            views: {
                'nav@': {
                    templateUrl: 'components/member/member-navigation/navbar.html',
                    controller: 'memberNavController',
                    controllerAs: 'ctrl'
                },
                'header@' : {
                  template : '<gs-main-nav></gs-main-nav>'
                }
            },
            data: {
                permissions: {
                  only: ['ROLE_USER']
                }
            }
        })
        // .state('admin', {
        //     abstract: true,
        //     url : '/admin',
        //     views: {
        //         'nav@': {
        //             templateUrl: 'components/admin/admin-navigation/navbar.html',
        //             controller: 'adminNavController',
        //             controllerAs: 'ctrl'
        //         },
        //         'header@' : {
        //           template : ''
        //         }
        //     },
        //     data: {
        //         permissions: {
        //           only: ['ROLE_TEACHER', 'ROLE_SECRETARY', 'ROLE_TREASURER']
        //         },
        //         redirectTo: {
        //           'canViewTopics' : 'admin.topics',
        //           'canViewClasses': 'admin.classes'
        //         }
        //
        //     }
        // })
        .state('access-denied', {
            url: '/denied',
            views: {
                'nav@':  {
                    template: ''
                },
                'header@' : {
                  template : ''
                },
                'content@': {
                    template: '<alert type="danger"><strong>Access Denied</strong><p>You don\'t have permission to see this. <a href="" ui-sref="index.home">Return home.</a></p></alert>'
                }
            }
        })
        .state('404', {
            url: '/error',
            views: {
                'nav@':  {
                    template: ''
                },
                'header@' : {
                  template : ''
                },
                'content@': {
                    template: '<alert type="danger"><strong>Erreur 404</strong><p></p></alert>'
                }
            },
            data: {
                permissions: {
                  except: ['ANONYMOUS'],
                  redirectTo : 'index.login'
                }
            }
        });

    $urlRouterProvider.otherwise( function($injector) {
      var state = $injector.get("$state");
      var authenticationService = $injector.get("authenticationService");

      authenticationService.getIdentity().then(function() {
        state.go('index.home');
      }, function() {
        state.go('index.logout');
      });
    });
}

function run($rootScope, $state, $stateParams, yearService, authenticationService, $cookies) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;
    });
}

function withPermissions(PermPermissionStore, aclService) {
  var permissions = ['canViewProfile', 'canViewSubscriptions', 'canViewTopics', 'canViewClasses'];

  PermPermissionStore.defineManyPermissions(permissions, function (permissionName, transitionProperties) {
    return aclService.hasPermission(permissionName);
  });
}

function withRoles(PermRoleStore, authenticationService, aclService, $q) {
  PermRoleStore
    .defineRole('ANONYMOUS', function (stateParams, roleName) {
      var result = authenticationService.isAnonymous();
//      console.info('check ANONYMOUS is ' + result);
      return result;
    });

  PermRoleStore
    .defineRole('AUTHORIZED', function (stateParams, roleName) {
      var result = authenticationService.isAuthenticated();
//      console.info('check AUTHORIZED is '+ result);
      return result;
    });

  PermRoleStore
    .defineRole('ROLE_USER', function(roleName, transitionProperties) {
      var result = aclService.isInRole(roleName);
//      console.info('check ROLE_USER is '+ result);
      return result;
    });

  PermRoleStore
    .defineRole('ROLE_TEACHER', function(roleName, transitionProperties) {
      var result = aclService.isInRole(roleName);
//      console.info('check ROLE_TEACHER is '+ result);
      return result;
    });
}

angular
  .module('app')
  .run(['$rootScope', '$state', '$stateParams', 'yearService', 'authenticationService', run])
  .run(['PermPermissionStore', 'authenticationService', withPermissions])
  .run(['PermRoleStore', 'authenticationService', 'aclService', '$q', withRoles]);
