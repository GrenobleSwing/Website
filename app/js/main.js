angular.module('app', ['ngCookies', 'ui.bootstrap', 'ngResource',
        'ui.router', 'permission', 'permission.ui', 'ngSanitize',
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

      return authenticationService.getIdentity().then(function() {
        return state.go('index.home');
      });
    });
}

function run($rootScope, $state) {
    $state.defaultErrorHandler();

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
      return authenticationService.isAnonymous();
    });

  PermRoleStore
    .defineRole('AUTHORIZED', function (stateParams, roleName) {
      return authenticationService.isAuthenticated();
    });

  PermRoleStore
    .defineRole('ROLE_USER', function(roleName, transitionProperties) {
      return aclService.isInRole(roleName);
    });
}

angular
  .module('app')
  .run(['$rootScope', '$state', run])
  .run(['PermPermissionStore', 'authenticationService', withPermissions])
  .run(['PermRoleStore', 'authenticationService', 'aclService', '$q', withRoles]);
