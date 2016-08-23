function MainNavController($state, authenticationService, identityService) {
  this.state = $state;
  this.identityService = identityService;
  this.authenticationService = authenticationService;

  this.isOpen = false;
  this.identity = {$ok: false};

  this.init_();
}

MainNavController.prototype = {

  init_: function init_() {
    this.identityService.getIdentity().then(function(data) {
      this.identity = data;
    }.bind(this));
  },

  isLogged: function isLogged() {
    return this.identityService.isIdentityResolved();
  },

  logout: function logout() {
    this.authenticationService.clearCredentials();
    this.identityService.clearIdentity();
    this.state.go('login');
  }
};
