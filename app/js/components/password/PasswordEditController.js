function PasswordEditController(passwordService) {
  this.oldPassword = "";
  this.newPassword = "";
  this.newPasswordConfirm = "";

  this.user = {$ok : false};

  this.passwordService = passwordService;
}

PasswordEditController.prototype = {

  save: function save() {
    return this.passwordService.updatePassword(this.user, oldPassword, newPassword, newPasswordConfirm);
  }
};
