function AccountEditController(sessionService, accountService) {
  this.accountService = accountService;
  this.account = {$ok: false};
  this.userId = sessionService.userId;
  this.init_();
}

AccountEditController.prototype = {
    init_ : function init_() {
  		this.handleInitResponse_ = this.handleInitResponse_.bind(this);
      this.handleSaveResponse_ = this.handleSaveResponse_.bind(this);

      this.account = this.accountService.getByUserId(this.userId).then(this.handleInitResponse_);
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
