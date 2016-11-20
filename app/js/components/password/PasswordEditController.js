function PasswordEditController(passwordService) {
  this.oldPassword = "";
  this.newPassword = "";
  this.newPasswordConfirm = "";

  this.user = {$ok : false};

  this.passwordService = newPasswordService;
}

PasswordEditController.prototype = {

  save: function save() {
    return this.newPasswordService.updatePassword(this.user, oldPassword, newPassword, newPasswordConfirm);
  }
};
