angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngResource',
    'ui.router',
    // 'app.auth',
    'app.acl',
    'app.common',
    'app.nav',
    'app.home',
    'app.login',
    // 'app.logout',
    'app.account',
    'app.subscriptions.view',
    'app.subscriptions.amount',
    // 'app.balance',
    'app.signup',
    // 'app.password',
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
            return auth.authorize();
          }]
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

  $urlRouterProvider.otherwise('home');
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
