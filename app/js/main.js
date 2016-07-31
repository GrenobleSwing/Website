angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngResource',
    'ui.router',
    'app.auth',
    'app.acl',
    'app.common',
    'app.nav',
    'app.home',
    'app.login',
    'app.logout',
    'app.account',
    'app.subscriptions.view',
    'app.subscriptions.amount',
    'app.balance',
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
      // data: {
      //   roles: ['USER']
      // },
      resolve: {
        authorize: ['authorizeService',
          function(authorizeService) {
            return authorizeService.authorize();
          }]
      // },
      // views: {
      //   'nav': {
      //     templateUrl: 'partials/navbar.html',
      //     controller: 'navController'
      //   }
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

  $urlRouterProvider.otherwise('app');
}

// function run_deprecated($rootScope, $location, $cookieStore, $http) {
//     // keep user logged in after page refresh
//     $rootScope.globals = $cookieStore.get('globals') || {};
//     if ($rootScope.globals.currentUser) {
//         $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//     }
//
//     $rootScope.$on('$routeChangeStart', function (event, next, current) {
//         // redirect to login page if not logged in and trying to access a restricted page
//         var restrictedPage = ['/login', '/sign-up'].indexOf($location.path()) === -1; // jshint ignore:line
//         var loggedIn = !!$rootScope.globals.currentUser ? !!$rootScope.globals.currentUser.userId && !!$rootScope.globals.currentUser.login && !!$rootScope.globals.currentUser.authdata : false;
//         if (restrictedPage && !loggedIn) {
//             $location.path('/login');
//         }
//     });
//
//     $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
//       var requireLogin = toState.data.requireLogin;
//
//       if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
//         event.preventDefault();
//         // get me a login modal!
//       }
//     });
//
//     // If the route change failed due to our "Unauthorized" error, redirect them
//     $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
//         if(rejection === 'Unauthorized'){
//           $location.path('/login');
//         }
//     });
// }

function run($rootScope, $state, $stateParams, authorizationService, identityService) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
    $rootScope.toState = toState;
    $rootScope.toStateParams = toStateParams;

    if (identityService.isIdentityResolved()) {
      authorizationService.authorize();
    }
  });
}
