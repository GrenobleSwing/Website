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
  },

  connect : function connect() {
      this.authenticationService.login(this.login, this.password).then(this.handleSuccess_);
  },

  handleSuccess_ : function handleSuccess_() {
    this.identityService.getIdentity().then(function(identity) {
      if (!!this.scope.returnToState) {
        this.state.go(this.scope.returnToState.name, this.scope.returnToStateParams);
      } else {
       this.state.go('account');
      }
    }.bind(this));
  }
};
