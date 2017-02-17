function PasswordService(passwordResource) {
  this.passwordResource = passwordResource;

  this.init_();
}

PasswordService.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    updatePassword: function updatePassword(account, oldPassword, newPassword, passwordConfirmation) {
        return this.passwordResource.change({userId: account.userId, old: oldPassword, new: newPassword, confirm: passwordConfirmation})
          .then(this.handleSuccess_, this.handleError_('Error updating password'));
    },


    resetPassword : function resetPassword(token, newPassword) {
      return this.passwordResource.change({new: newPassword, token: token})
        .then(this.handleSuccess_, this.handleError_('Error updating password'));
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
