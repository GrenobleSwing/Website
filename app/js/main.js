angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngResource',
    'ui.router',
    'ngMessages',
    'app.account',
    'app.acl',
    'app.admin.nav',
    'app.auth',
    'app.cnil',
    'app.common',
    'app.home',
    'app.invoice.request',
    'app.login',
    'app.logout',
    'app.main.nav',
    'app.member.nav',
    'app.password',
    'app.signup',
    'app.subscriptions.common',
    'app.subscriptions.list',
    'app.subscriptions.description.duet',
    'app.subscriptions.description.solo',
    'app.subscriptions.duet.dialog',
    'app.subscriptions.amount',
    'app.summary',
    'app.users',
    'pascalprecht.translate',
    'rorymadden.date-dropdowns'
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
