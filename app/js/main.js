angular.module('app', ['ngCookies', 'ui.bootstrap', 'ngResource',
    'ui.router',
    'ngMessages',
    'ui.grid',
    'app.account',
    'app.acl',
    'app.admin',
    'app.admin.nav',
    'app.admin.secretariat',
    'app.admin.treasury',
    'app.auth',
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
    'app.password',
    'app.signup',
    'app.subscriptions.common',
    'app.subscriptions.list',
    'app.subscriptions.description.duet',
    'app.subscriptions.description.solo',
    'app.subscriptions.duet.dialog',
    'app.subscriptions.amount',
    'app.summary',
    'app.topic.common',
    'app.topic.edit',
    'app.topic.list',
    'app.users',
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
          templateUrl: 'components/member-navigation/navbar.html',
          controller: 'memberNavController',
          controllerAs: 'ctrl'
        }
      },
      data: {
        requireLogin: true,
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
          templateUrl: 'components/admin-navigation/navbar.html',
          controller: 'adminNavController',
          controllerAs: 'ctrl'
        }
      },
      data: {
        requireLogin: true,
      }
    })
    .state('access-denied', {
      url: '/denied',
      views: {
        'nav': {
          template: ''
        },
        'content@': {
          template: '<alert type="danger"><strong>Access Denied</strong><p>You don\'t have permission to see this. <a href="" ui-sref="index.home">Return home.</a></p></alert>'
        }
      },
      data: {
        requireLogin: false,
        roles: []
      }
    });

  $urlRouterProvider.otherwise('/');
}

function run($rootScope, $state, $stateParams, authService, identityService) {
  identityService.getIdentity(true).then(function(data) {

  }, function(error) {
    identityService.clearIdentity();
    $state.go('login');
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
    $rootScope.toState = toState;
    $rootScope.toStateParams = toStateParams;
    if (identityService.isAuthenticated()) {
      authService.authorize();
    }
  });
}

angular.module('app').run(['$rootScope', '$state', '$stateParams', 'authorizationService', 'identityService', run]);
