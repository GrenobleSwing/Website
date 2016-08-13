function MainNavController(identityService) {
  this.identityService = identityService;

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

  isActive: function isActive() {
    return this.identityService.isIdentityResolved();
  }
};
