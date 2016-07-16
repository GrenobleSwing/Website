function AccountViewController($scope, accountService) {
  this.accountService = accountService;
  this.account = {$ok: false};
  this.user = $scope.user;
  this.init_();
}

AccountViewController.prototype = {
    init_ : function init_() {
  		this.handleInitResponse_ = this.handleInitResponse_.bind(this);
      this.account = this.accountService.getByUser(this.user).then(this.handleInitResponse_);
    },

    handleInitResponse_ : function handleInitResponse_(response) {
  		this.account = response;
  		this.account.$ok = true;
      return this.account;
    },
};
