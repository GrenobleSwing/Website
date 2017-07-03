function MainNavController($state, authenticationService) {
  this.state = $state;

  this.authenticationService = authenticationService;

  this.isOpen = false;
  this.identity = {$ok: false};

  this.init_();
}

MainNavController.prototype = {

  init_: function init_() {
    this.authenticationService
      .getIdentity()
      .then(function(response) {
        // console.info(response);
        this.identity = response.data;
      }.bind(this));
  },

  logout: function logout() {
    // console.info("MainNavController#controller#logout");
    this.state.go('index.logout');
  }
};
