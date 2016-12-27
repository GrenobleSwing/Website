function MainNavController($scope, $state, authenticationService, identityService) {
  this.scope = $scope;
  this.state = $state;
  this.identityService = identityService;
  this.authenticationService = authenticationService;

  this.isOpen = false;
  this.identity = {$ok: false};

  this.init_();
}

MainNavController.prototype = {

  init_: function init_() {
    this.identityService.addListener(function(data) {
      this.identity = data;
    }.bind(this), 'MainNavController');

    this.scope.$on("$destroy", function() {
        this.identityService.removeListener('MainNavController');
    }.bind(this));
  },

  isLogged: function isLogged() {
    return this.identityService.isAuthenticated();
  },

  hasPermission: function hasPermission(role) {
    return this.identityService.isInRole(role);
  },

  hasPermissions: function hasPermissions(roles) {
    return this.identityService.isInAnyRole(roles);
  },


  logout: function logout() {
    this.authenticationService.clearCredentials();
    this.identityService.clearIdentity();
    this.state.go('index.login');
  }
};
