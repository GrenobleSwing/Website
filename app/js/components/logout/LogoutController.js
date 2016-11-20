function LogoutController($state, authenticationService, identityService) {
    this.state = $state;
    this.identityService = identityService;
    this.authenticationService = authenticationService;
}

LogoutController.prototype =  {
    logout: function logout() {
      this.authenticationService.clearCredentials();
      this.identityService.clearIdentity();
      this.state.go('index.login');
    }
};
