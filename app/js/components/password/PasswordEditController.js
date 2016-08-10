function PasswordEditController(passwordService) {
  this.password = "";
  this.passwordConfirm = "";

  this.user = {$ok : false};

  this.passwordService = passwordService;

  console.info("PasswordEditController");
}

PasswordEditController.prototype = {

  save: function save() {
    return this.passwordService.updatePassword(this.user, password, passwordConfirm);
  }
};
