function LogoutRouterConfig($stateProvider) {
  $stateProvider.state('index.logout', {
		url: '/logout',
		views: {
      'content@': {
        template : "<div />",
        controller: function ($rootScope, $cookies, $state, $http) {
          // authenticationService
          //   .clearCredentials()
          //   .finally(function() {
          //     console.info("LogoutRouterConfig#logout");
          //     $state.go('index.login');
          //   });
          $rootScope.globals = {};
          $cookies.remove('globals');
          $http.defaults.headers.common.Authorization = 'Bearer';
          $state.go('index.login');
        }
      }
    },
    data: {
        permissions: {
          except: ['ANONYMOUS'],
          redirectTo: 'index.login'
        }
    }
  });
}
