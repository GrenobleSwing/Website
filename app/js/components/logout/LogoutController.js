function LogoutController($location, authenticationService) {
    this.location = $location;
    this.authenticationService = authenticationService;
}

LogoutController.prototype =  {
    logout: function logout() {
      this.authenticationService.clearCredentials();
      this.location.path('/login');
    }
};
