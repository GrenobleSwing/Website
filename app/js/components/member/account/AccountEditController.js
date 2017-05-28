function AccountEditController(authenticationService, accountService) {
  this.authenticationService = authenticationService;
  this.accountService = accountService;
  this.account = {$ok: false};
  this.phonePattern = /^((\+|00)33\s?|0)[1-5](\s?\d{2}){4}$/;
  this.init_();
}

AccountEditController.prototype = {
    init_ : function init_() {
  		this.handleInitResponse_ = this.handleInitResponse_.bind(this);
      this.handleSaveResponse_ = this.handleSaveResponse_.bind(this);

      this.authenticationService.getIdentity().then(function (user) {
        this.account = this.accountService.getByUserId(user.data.id).then(this.handleInitResponse_);
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
