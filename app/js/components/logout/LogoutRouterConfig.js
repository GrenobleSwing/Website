function LogoutRouterConfig($stateProvider) {
  $stateProvider.state('logout', {
		url: '/logout',
    data: {
      roles: ['USER']
    },
		controller: function LogoutController($state, authenticationService, identityService) {
        authenticationService.clearCredentials();
        identityService.clearIdentity();
        $state.go('login');
    }
  });
}
