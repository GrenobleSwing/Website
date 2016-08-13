function LogoutController($state, identityService) {
    this.state = $state;
    this.identityService = identityService;
}

LogoutController.prototype =  {
    logout: function logout() {
      this.identityService.clearIdentity();
      this.state.go('login');
    }
};
