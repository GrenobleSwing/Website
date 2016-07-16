function HomeController(sessionService, userService, authorizeService) {
  this.authorizeService = authorizeService;
  this.sessionService = sessionService;
  this.userService = userService;

  this.user = {$ok: false};
  this.init_();
}

HomeController.prototype = {

  init_: function init_() {
    this.user = this.userService.getById(this.sessionService.userId).then(function(data) {
      this.user = data;
      this.user.$ok = true;
      return this.user;
    }.bind(this));
  },

  showAccount : function showAccount() {
    return this.authorizeService.canAccess('account_view');
  },

  showPassword : function showAccount() {
    return false;
  },

  showSubscriptions : function showAccount() {
    return this.authorizeService.canAccess('account_view');
  },

  showBalance : function showAccount() {
    return false;
  },

  showTopics : function showAccount() {
    return false;
  }
};
