function LoginController($scope, $state, authenticationService, identityService) {
  this.scope = $scope;
  this.state = $state;

  this.login = "";
  this.password = "";

  this.authenticationService = authenticationService;
  this.identityService = identityService;

  this.init_();
}

LoginController.prototype = {
  init_ : function init_() {
    this.handleSuccess_ = this.handleSuccess_.bind(this);

    this.authenticationService.clearCredentials();
    this.identityService.clearIdentity();
  },

  connect : function connect() {
      this.authenticationService.login(this.login, this.password).then(this.handleSuccess_);
  },

  handleSuccess_ : function handleSuccess_() {
    this.identityService.getIdentity().then(function(identity) {
      if (!!this.scope.returnToState && this.scope.returnToState.name !== 'index.home') {
        this.state.go(this.scope.returnToState.name, this.scope.returnToStateParams);
      } else if(this.identityService.isInRole('USER')){
        this.state.go('member.account');
      } else if(this.identityService.isInRole('TOPIC_MANAGER')){
        this.state.go('admin.admin');
      } else if(this.identityService.isInRole('SECRETARY')){
        this.state.go('admin.secretariat');
      } else if(this.identityService.isInRole('TREASURER')){
        this.state.go('admin.treasury');
      }
    }.bind(this));
  }
};
