function MainNavController($scope, $state, authenticationService, aclService) {
  this.scope = $scope;
  this.state = $state;
  this.aclService = aclService;
  this.authenticationService = authenticationService;

  this.isOpen = false;
  this.identity = {$ok: false};

  this.init_();
}

MainNavController.prototype = {

  init_: function init_() {
    this.identityService
      .getIdentity()
      .then(function(data) {
        this.identity = data;
      }.bind(this));
  },

  isLogged: function isLogged() {
    return this.identityService.isAuthenticated();
  },

  hasPermission: function hasPermission(role) {
    return this.aclService.isInRole(role);
  },

  hasPermissions: function hasPermissions(roles) {
    return this.identityService.isInAnyRole(roles);
  },


  logout: function logout() {
    console.info("MainNavController#controller#logout");
    this.authenticationService.clearCredentials();
    this.identityService.clearIdentity();
    this.state.go('index.login');
  }
};
