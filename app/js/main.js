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
    // .config(function($interpolateProvider) {
    //     $interpolateProvider.startSymbol('||');
    //     $interpolateProvider.endSymbol('||');
    // })
    .config(['$translateProvider', TranslateConfiguration]);

function DefaultRouteConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
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
                  only: ['ROLE_MEMBER']
                }
            }
        })
        .state('admin', {
            url : '/admin',
            views: {
                'nav@': {
                    templateUrl: 'components/admin/admin-navigation/navbar.html',
                    controller: 'adminNavController',
                    controllerAs: 'ctrl'
                },
                'header@' : {
                  template : ''
                }
            },
            data: {
                permissions: {
                  only: ['ROLE_TEACHER', 'ROLE_SECRETARY', 'ROLE_TREASURER']
                },
                redirectTo: {
                  'canViewTopics' : 'admin.topics',
                  'canViewClasses': 'admin.classes'
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

      // console.info("go for otherwise");
      authenticationService.getIdentity().then(function() {

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

    authenticationService
      .getIdentity(true)
      .then(function(response) {
          console.info("user is identified");
          return yearService.getCurrentYear().then(function(response) {
              console.info("year is identified");
              console.info(response);
              $state.go('index.home');
              return response;
            });
        }, function(error) {
          console.info("user is unknown");
          $state.go('index.login');
          return error;
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
      console.info('check ANONYMOUS');
      return authenticationService.isAnonymous();
    });

  PermRoleStore
    .defineRole('AUTHORIZED', function (stateParams, roleName) {
      console.info('check AUTHORIZED');
      return authenticationService.isAuthenticated();
    });

  PermRoleStore
    .defineRole('ROLE_MEMBER', function(roleName, transitionProperties) {
      return aclService.isInRole(roleName);
    });

  PermRoleStore
    .defineRole('ROLE_TEACHER', function(roleName, transitionProperties) {
      return aclService.isInRole(roleName);
    });
}

angular
  .module('app')
  .run(['$rootScope', '$state', '$stateParams', 'yearService', 'authenticationService', run])
  .run(['PermPermissionStore', 'authenticationService', withPermissions])
  .run(['PermRoleStore', 'authenticationService', 'aclService', '$q', withRoles]);
