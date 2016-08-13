function LogoutRouterConfig($stateProvider) {
  $stateProvider.state('logout', {
		url: '/logout',
    data: {
      roles: ['USER']
    },
		controller: function LogoutController($state, identityService) {
        identityService.clearIdentity();
        $state.go('login');
    }
  });
}
