function AccountEditController(identityService, accountService) {
  this.identityService = identityService;
  this.accountService = accountService;
  this.account = {$ok: false};
  this.init_();
}

AccountEditController.prototype = {
    init_ : function init_() {
  		this.handleInitResponse_ = this.handleInitResponse_.bind(this);
      this.handleSaveResponse_ = this.handleSaveResponse_.bind(this);

      this.identityService.getIdentity().then(function (user) {
        this.account = this.accountService.getByUserId(user.id).then(this.handleInitResponse_);
      }.bind(this));
    },

    save : function save() {
      this.accountService.updateAccount(this.account).then(this.handleSaveResponse_);
    },

    handleInitResponse_ : function handleInitResponse_(response) {
  		this.account = response;
  		this.account.$ok = true;
      return this.account;
    },

    handleSaveResponse_ : function handleSaveResponse_(response) {
      return this.account;
    }
};
