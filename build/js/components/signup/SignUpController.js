function SignUpController($state, userService) {
  this.state = $state;
  this.userService = userService;

  this.login = "";
  this.password = "";
  this.passwordConfirmation = "";

  this.init_();
}

SignUpController.prototype = {
    init_ : function init_() {
        this.handleResponse_ = this.handleResponse_.bind(this);
    },

    signUp : function signUp() {
        this.userService.create({login: this.login, password: this.password}).then(this.handleResponse_);
    },

    handleResponse_ : function handleResponse_(response) {
        this.state.go('login');
    }
};
