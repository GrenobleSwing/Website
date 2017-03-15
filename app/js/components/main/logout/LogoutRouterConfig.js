function LogoutRouterConfig($stateProvider) {
  $stateProvider.state('index.logout', {
		url: '/logout',
		views: {
      'content@': {
        template : "<div />",
        controller: function ($state, authenticationService, identityService) {
          authenticationService.clearCredentials();
          identityService
            .clearIdentity()
            .then(function() {
              console.info("LogoutRouterConfig#logout");
              $state.go('index.login');
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
