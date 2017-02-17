function PasswordResetController($stateParams, passwordService) {

  this.newPassword = "";
  this.token = $stateParams.token;
  this.passwordService = passwordService;
}

PasswordResetController.prototype = {

  reset: function reset() {
    return this.passwordService.resetPassword(this.token, this.newPassword);
  }
};
