function SignUpController($sce, content) {
  this.content = $sce.trustAsHtml(content);
  // this.state = $state;
  // this.http = $http;
  // this.config = config;
  //
  // this.login = "";
  // this.password = "";
  // this.passwordConfirmation = "";
  //
  // this.init_();
}

SignUpController.prototype = {
    // init_ : function init_() {
    //     this.handleResponse_ = this.handleResponse_.bind(this);
    // },
    //
    // signUp : function signUp() {
    //     this.http.post(this.config.apiUrl + '/user', {login: this.login, password: this.password}).then(this.handleResponse_);
    // },
    //
    // handleResponse_ : function handleResponse_(response) {
    //   console.info("SignUpController#handleResponse_");
    //     this.state.go('index.login');
    // }
};
