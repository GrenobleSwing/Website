function LoginController($scope, $state, authenticationService, aclService) {
  this.scope = $scope;
  this.state = $state;

  this.login = "";
  this.password = "";
  this.authFailed = false;

  this.authenticationService = authenticationService;
  this.aclService = aclService;

  this.init_();
}

LoginController.prototype = {
  init_ : function init_() {
    this.handleSuccess_ = this.handleSuccess_.bind(this);
    this.handleError_ = this.handleError_.bind(this);

    this.aclService.isInRole = this.aclService.isInRole.bind(this.aclService);

    // this.authenticationService.clearCredentials();
    // this.identityService.clearIdentity();
  },

  connect : function connect() {
    console.info("LoginController#connect");
    this.authFailed = false;
    this.authenticationService
      .login(this.login, this.password)
      // .then(this.aclService.getIdentity.bind(this.identityService), this.handleError_)
      .then(this.handleSuccess_, this.handleError_);
  },

  handleSuccess_ : function handleSuccess_(identity) {
    console.info("LoginController#connect#handleSuccess_");
    if (!!this.scope.returnToState && this.scope.returnToState.name != 'index.login' &&
      this.scope.returnToState.name != '404' && this.scope.returnToState.name != 'access-denied') {
      console.info("returnToState: " + this.scope.returnToState.name);
      this.state.go(this.scope.returnToState.name, this.scope.returnToStateParams);
    } else {
      this.aclService
        .isInAnyRole('ROLE_MEMBER', 'ROLE_TEACHER', 'ROLE_SECRETARY', 'ROLE_TREASURER')
        .then(function(response) {
          console.info(response);
          console.info(response.data.defaultState.role + "go for state " + response.data.defaultState);
          this.state.go(response.data.defaultState);
        });
    }
  },

  handleError_ : function handleError_(error)  {
    console.error(error);
    this.authFailed = true;
    return error;
  }
};
