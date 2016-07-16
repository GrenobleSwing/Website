function AccountService(resource, passwordResource) {
  this.accountResource = resource;
  this.passwordResource = passwordResource;

  this.init_();
}

AccountService.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getByUser: function getByUser(user) {
        return this.accountResource.getByUserId(user.id).then(this.handleSuccess_, this.handleError_('Error getting account by accountname'));
    },

    updateAccount: function updateAccount(account) {
  		if (account.id === null) {
  			return this.accountResource.create(account).then(this.handleSuccess_, this.handleError_('Error creating account'));
  		} else {
  			return this.accountResource.update(account).then(this.handleSuccess_, this.handleError_('Error updating account'));
  		}
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        res.$ok = true;
        return res;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { $ok: false, message: error };
        };
    }
};
