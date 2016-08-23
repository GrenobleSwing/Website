angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngResource',
    'ui.router',
    'ngMessages',
    'app.auth',
    'app.acl',
    'app.common',
    'app.main.nav',
    'app.member.nav',
    'app.home',
    'app.login',
    'app.logout',
    'app.account',
    'app.subscriptions.common',
    'app.subscriptions.list',
    'app.subscriptions.summary',
    'app.subscriptions.description.duet',
    'app.subscriptions.description.solo',
    'app.subscriptions.duet.dialog',
    'app.admin.nav',
    'app.signup',
    'app.password',
    'app.users',
    'pascalprecht.translate'
  ])
  .config(['$stateProvider', '$urlRouterProvider', DefaultRouteConfig])
  .config(['$translateProvider', TranslateConfiguration])
  .run(['$rootScope', '$state', '$stateParams', 'authorizationService', 'identityService', run]);

function DefaultRouteConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index', {
      abstract: true,
      resolve: {
        authorize: ['authorizationService',
          function(authService) {
            return authService.authorize();
          }]
      },
      views: {
        'nav@': {
          template: ''
        }
      }
    })
    .state('member', {
      abstract: true,
      resolve: {
        authorize: ['authorizationService',
          function(authService) {
            return authService.authorize();
          }]
      },
      views: {
        'nav@': {
          templateUrl: 'js/components/member-navigation/navbar.html',
          controller: 'memberNavController',
          controllerAs: 'ctrl'
        // },
      //   'content@': {
      //     template: '<ui-view/>'
        }
      }
    })
    .state('admin', {
      abstract: true,
      resolve: {
        authorize: ['authorizationService',
          function(authService) {
            return authService.authorize();
          }]
      },
      views: {
        'nav@': {
          templateUrl: 'js/components/admin-navigation/navbar.html',
          controller: 'adminNavController',
          controllerAs: 'ctrl'
        }
      }
    })
    .state('accessdenied', {
      url: '/denied',
      data: {
        roles: []
      },
      views: {
        'nav': {
          template: ''
        },
        'content@': {
          template: '<alert type="danger"><strong>Access Denied</strong><p>You don\'t have permission to see this. <a href="" ui-sref="home">Return home.</a></p></alert>'
        }
      }
    });

  $urlRouterProvider.otherwise('/');
}

function run($rootScope, $state, $stateParams, authService, identityService) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
    $rootScope.toState = toState;
    $rootScope.toStateParams = toStateParams;

    if (identityService.isIdentityResolved()) {
      authService.authorize();
    }
  });
}
