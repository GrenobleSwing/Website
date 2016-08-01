function AuthorizationService($rootScope, $state, identityService)  {
  this.rootScope = $rootScope;
  this.state = $state;
  this.identityService = identityService;

  this.handleSuccess_ = this.handleSuccess_.bind(this);
  this.handleError_ = this.handleError_.bind(this);
}

AuthorizationService.prototype = {
  authorize: function authorize() {
    // console.info("AuthorizationService#authorize");
    return this.identityService.getIdentity().then(this.handleSuccess_, this.handleError_);
  },

  handleSuccess_: function handleSuccess_() {
    var isAuthenticated = this.identityService.isAuthenticated();

    if (!!this.rootScope.toState.data.roles && this.rootScope.toState.data.roles.length > 0 && !this.identityService.isInAnyRole(this.rootScope.toState.data.roles)) {
      if (isAuthenticated) {
        // console.info("AuthorizationService#handleSuccess_ 1");
        // user is signed in but not authorized for desired state
        this.state.go('accessdenied');
      } else {
        // console.info("AuthorizationService#handleSuccess_ 2");

        // user is not authenticated. stow the state they wanted before you
        // send them to the signin state, so you can return them when you're done
        this.rootScope.returnToState = this.rootScope.toState;
        this.rootScope.returnToStateParams = this.rootScope.toStateParams;

        // now, send them to the signin state so they can log in
        this.state.go('login');
      }
    } else {
      // console.info("AuthorizationService#handleSuccess_ 3");
    }

  },

  handleError_: function handleError_() {
    // console.info("AuthorizationService#handleError_");
    this.state.go('login');
  }
};
