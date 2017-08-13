function PasswordEditController(passwordService, userDetails) {
  this.userDetails = userDetails;

  this.oldPassword = "";
  this.newPassword = "";
  this.newPasswordConfirm = "";

  this.passwordService = passwordService;
}

PasswordEditController.prototype = {

  save: function save() {
    return this.passwordService.updatePassword(this.userDetails.id, oldPassword, newPassword, newPasswordConfirm);
  }
};
