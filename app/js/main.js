angular.module('app', ['ngCookies', 'ui.bootstrap', 'ngResource',
        'ui.router', 'permission',
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
                'nav':  {
                    template: ''
                },
                'header' : {
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
                'header' : {
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
      var identityService = $injector.get("identityService");
      var aclService = $injector.get("aclService");

      console.info("go for otherwise");

      if (identityService.isAuthenticated()) {
        // if(aclService.isInRole('ROLE_MEMBER')){
        //   console.info("goToState: " + 'member.account');
        //   state.go('member.account');
        // } else if(aclService.isInRole('ROLE_TEACHER')){
        //   console.info("goToState: " + 'admin.admin');
        //   state.go('admin.admin');
        // } else if(aclService.isInRole('ROLE_SECRETARY')){
        //   console.info("goToState: " + 'admin.secretariat');
        //   state.go('admin.secretariat');
        // } else if(aclService.isInRole('ROLE_TREASURER')){
        //   console.info("goToState: " + 'admin.treasury');
        //   state.go('admin.treasury');
        // } else {
        //   state.go('access-denied');
        // }
      } else {
        state.go('index.login');
      }
    });
}

function run($rootScope, $state, $stateParams, tokenService, yearService) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;
    });

    $rootScope.$on('$stateChangePermissionStart', function(event, toState, toParams, options) {
      console.info("Start of authorizing change to state " + toState.name);
    });

    $rootScope.$on('$stateChangePermissionAccepted', function(event, toState, toParams, options) {
      console.info("One of the permissions has been accepted and the state changes successfully to " + toState.name);
    });

    $rootScope.$on('$stateChangePermissionDenied', function(event, toState, toParams, options) {
      console.info("Access to the target state " + toState.name + " is not granted.");
    });

    tokenService.isValid()
    .then(function(token) {
        console.info("user is identified");
      }, function() {
        console.info("user is unknown");
        $state.go('index.login');
      })
    .then(yearService.getCurrentYear.bind(yearService))
    .then(function(year) {
        console.info("year is identified");
        console.info(year);
      });
}

function withPermissions(PermPermissionStore, identityService) {
  var permissions = ['canViewProfile', 'canViewSubscriptions', 'canViewTopics', 'canViewClasses'];

  PermPermissionStore.defineManyPermissions(permissions, function (permissionName, transitionProperties) {
    // console.info("withPermission : " + permissionName);
    return identityService.hasPermission(permissionName);
  });

  // console.info(PermPermissionStore.getStore());
}

function withRoles(PermRoleStore, identityService, $q) {
  PermRoleStore
    .defineRole('ANONYMOUS', function (stateParams, roleName) {
      var deferred = $q.defer();
      identityService.getIdentity()
      .then(function(response) {
        if (!response.data.$ok) {
          deferred.resolve(response.data);
        } else {
          deferred.reject(response.data);
        }
      });
      return deferred.promise;
     });

   PermRoleStore
     .defineRole('AUTHORIZED', function (stateParams, roleName) {
         return identityService.getIdentity();
      });

  PermRoleStore

  .defineRole('ROLE_MEMBER', function(roleName, transitionProperties) {
    var result =  identityService.isInRole(roleName);
    console.info(roleName + ' ? ' + result);
    return result;
  });
  PermRoleStore
    .defineRole('ROLE_TEACHER', function(roleName, transitionProperties) {
      var result =  identityService.isInRole(roleName);
      console.info(roleName + ' ? ' + result);
      return result;
    });

    // console.info(PermRoleStore.getStore());

    // console.info(PermRoleStore.getRoleDefinition('ROLE_MEMBER'));
}

angular
  .module('app')
  .run(['$rootScope', '$state', '$stateParams', 'tokenService', 'yearService', run])
  .run(['PermPermissionStore', 'identityService', withPermissions])
  .run(['PermRoleStore', 'identityService', withRoles]);
