angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngResource',
    'app.auth',
    'app.acl',
    'app.common',
    'app.home',
    'app.login',
    'app.logout',
    'app.account',
    'app.subscriptions',
    'app.balance',
    'app.signup',
    'app.password',
    'app.users',
    'pascalprecht.translate'
  ])
  .config(['$routeProvider', DefaultRouteConfig])
  .config(['$translateProvider', TranslateConfiguration])
  .run(['$rootScope', '$location', '$cookieStore', '$http', run]);

function DefaultRouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/login' });
}

function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = ['/login', '/sign-up'].indexOf($location.path()) === -1; // jshint ignore:line
        var loggedIn = !!$rootScope.globals.currentUser ? !!$rootScope.globals.currentUser.login && !!$rootScope.globals.currentUser.authdata : false;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });

    // If the route change failed due to our "Unauthorized" error, redirect them
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
        if(rejection === 'Unauthorized'){
          $location.path('/login');
        }
    });

}
