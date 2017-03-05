function LoginController($scope, $state, authenticationService, identityService) {
  this.scope = $scope;
  this.state = $state;

  this.login = "";
  this.password = "";
  this.authFailed = false;

  this.authenticationService = authenticationService;
  this.identityService = identityService;

  this.init_();
}

LoginController.prototype = {
  init_ : function init_() {
    this.handleSuccess_ = this.handleSuccess_.bind(this);
    this.handleError_ = this.handleError_.bind(this);

    // this.authenticationService.clearCredentials();
    // this.identityService.clearIdentity();
  },

  connect : function connect() {
    this.authFailed = false;
    this.authenticationService
      .login(this.login, this.password)
      .then(this.identityService.getIdentity.bind(this.identityService), this.handleError_)
      .then(this.handleSuccess_, this.handleError_);
  },

  handleSuccess_ : function handleSuccess_(identity) {
      // console.info("LoginController#connect#handleSuccess_");
      if (!!this.scope.returnToState && this.scope.returnToState.name != 'index.login' &&
        this.scope.returnToState.name != '404' && this.scope.returnToState.name != 'access-denied') {
        console.info("returnToState: " + this.scope.returnToState.name);
        this.state.go(this.scope.returnToState.name, this.scope.returnToStateParams);
      } else if(this.identityService.isInRole('ROLE_MEMBER')){
        console.info("goToState: " + 'member.account');
        this.state.go('member.account');
      } else if(this.identityService.isInRole('ROLE_TEACHER')){
        console.info("goToState: " + 'admin.admin');
        this.state.go('admin.admin');
      } else if(this.identityService.isInRole('ROLE_SECRETARY')){
        console.info("goToState: " + 'admin.secretariat');
        this.state.go('admin.secretariat');
      } else if(this.identityService.isInRole('ROLE_TREASURER')){
        console.info("goToState: " + 'admin.treasury');
        this.state.go('admin.treasury');
      } else {
        this.state.go('access-denied');
      }
  },

  handleError_ : function handleError_(error)  {
    console.error(error);
    this.authFailed = true;
  }
};
