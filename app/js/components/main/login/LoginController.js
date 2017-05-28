function LoginController($scope, $state, authService, aclService) {
  this.scope = $scope;
  this.state = $state;

  this.login = "";
  this.password = "";
  this.authFailed = false;

  this.authService = authService;
  this.aclService = aclService;

  this.init_();
}

LoginController.prototype = {
  init_ : function init_() {
    this.handleSuccess_ = this.handleSuccess_.bind(this);
    this.handleError_ = this.handleError_.bind(this);
  },

  connect : function connect() {
    console.info("LoginController#connect");
    this.authFailed = false;
    this.authService
      .login(this.login, this.password)
      .then(this.handleSuccess_, this.handleError_);
  },

  handleSuccess_ : function handleSuccess_(identity) {
    console.info("LoginController#connect#handleSuccess_");
    if (!!this.scope.returnToState && this.scope.returnToState.name != 'index.login' &&
      this.scope.returnToState.name != '404' && this.scope.returnToState.name != 'access-denied') {
      console.info("returnToState: " + this.scope.returnToState.name);
      this.state.go(this.scope.returnToState.name, this.scope.returnToStateParams);
    } else {
      return this.aclService
        .isInAnyRole(['ROLE_USER', 'ROLE_TEACHER', 'ROLE_SECRETARY', 'ROLE_TREASURER'])
        .then(function(response) {
          console.info(response);
          console.info(response.defaultState.role + " go for state " + response.defaultState);
          this.state.go('index.home');
        }.bind(this), this.handleError_);
    }
  },

  handleError_ : function handleError_(error)  {
    console.error(error);
    this.authFailed = true;
    return error;
  }
};
