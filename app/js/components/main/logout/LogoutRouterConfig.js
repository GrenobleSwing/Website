function LogoutRouterConfig($stateProvider) {
  $stateProvider.state('index.logout', {
		url: '/logout',
    views: {
      'content@': {
        template : "<div />",
        controller: function ($rootScope, $cookies, $state, $http, config) {
          console.info("LogoutRouterConfig#controller");
          return $http.get(config.apiUrl + '/disconnect').finally(function() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Bearer';
            return $state.go('index.login');
          });
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
