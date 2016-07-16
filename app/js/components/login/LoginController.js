function LoginController($location, authenticationService) {
  this.location = $location;
  this.login = "";
  this.password = "";
  this.isLoading = false;
  this.authenticationService = authenticationService;
  this.init_();
}

LoginController.prototype = {
  init_ : function init_() {
    this.onResponse_ = this.onResponse_.bind(this);
    this.authenticationService.clearCredentials();
  },

  connect : function connect() {
      this.isLoading = false;
      this.authenticationService.login(this.login, this.password).then(this.onResponse_);
  },

  onResponse_ : function onResponse_(user) {
      this.isLoading = false;
      if (user.$ok) {
          this.location.path('/home');
      } else {
          // console.error(response.message);
      }
  }
};
