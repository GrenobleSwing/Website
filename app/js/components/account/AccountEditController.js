function AccountEditController(sessionService, userService, accountService) {
  this.sessionService = sessionService;
  this.userService = userService;
  this.accountService = accountService;
  this.account = {$ok: false};
  this.user = {$ok: false};
  this.init_();
}

AccountEditController.prototype = {
    init_ : function init_() {
  		this.handleInitResponse_ = this.handleInitResponse_.bind(this);
      this.user = this.userService.getById(this.sessionService.userId).then(function(data) {
        this.user = data;
        this.user.$ok = true;
        return this.user;
      }.bind(this));
    },

    handleInitResponse_ : function handleInitResponse_(response) {
  		this.account = response;
  		this.account.$ok = true;
      return this.account;
    },
};
