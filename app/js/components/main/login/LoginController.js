function LoginController($scope, $state, authService, aclService) {
  this.scope = $scope;
  this.state = $state;

  this.login = "";
  this.password = "";
  this.authFailed = false;

  this.authService = authService;
  this.aclService = aclService;

  this.handleSuccess_ = this.handleSuccess_.bind(this);
  this.handleError_ = this.handleError_.bind(this);
}

LoginController.prototype = {

  connect : function connect() {
    this.authFailed = false;
    return this.authService
      .login(this.login, this.password)
      .then(this.handleSuccess_, this.handleError_);
  },

  handleSuccess_ : function handleSuccess_(identity) {
    if (!!this.scope.returnToState && this.scope.returnToState.name != 'index.login' &&
      this.scope.returnToState.name != '404' && this.scope.returnToState.name != 'access-denied') {
      return this.state.go(this.scope.returnToState.name, this.scope.returnToStateParams);
    } else {
      return this.aclService
        .isInAnyRole(['ROLE_USER'])
        .then(function(response) {
          return this.state.go('index.home');
        }.bind(this), this.handleError_);
    }
  },

  handleError_ : function handleError_(error)  {
    console.error(error);
    this.authFailed = true;
    return error;
  }
};
