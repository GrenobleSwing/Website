function LogoutController($location, identityService) {
    this.location = $location;
    this.identityService = identityService;
}

LogoutController.prototype =  {
    logout: function logout() {
      this.identityService.clearIdentity();
      $state.go('login');
    }
};
