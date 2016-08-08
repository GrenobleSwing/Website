angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngResource',
    'ui.router',
    // 'app.auth',
    'app.acl',
    'app.common',
    'app.nav',
    'app.home',
    'app.login',
    'app.account',
    'app.subscriptions.common',
    'app.subscriptions.view',
    'app.subscriptions.list',
    'app.subscriptions.description.duet',
    'app.subscriptions.description.solo',
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
    .state('app', {
      abstract: true,
      resolve: {
        authorize: ['authorizationService',
          function(authService) {
            return authService.authorize();
          }]
      },
      views: {
        'nav@': {
          templateUrl: 'partials/navbar.html',
          controller: 'navController',
          controllerAs: 'ctrl'
        },
        'content@': {
          template: '<ui-view/>'
        }
      }
    })
    .state('accessdenied', {
      parent: 'app',
      url: '/denied',
      data: {
        roles: []
      },
      views: {
        'content@': {
          template: '<alert type="danger"><strong>Access Denied</strong><p>You don\'t have permission to see this. <a href="" ui-sref="home">Return home.</a></p></alert>'
        }
      }
    });

  $urlRouterProvider.otherwise('login');
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
