function PasswordEditController(passwordService) {
  this.password = "";
  this.passwordConfirm = "";

  this.user = {};

  this.passwordService = passwordService;
}

PasswordEditController.prototype = {

  save: function save() {
    return this.passwordService.updatePassword(this.user, password, passwordConfirm);
  }
};
