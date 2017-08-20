function MainNavController($state, authenticationService, config, $http, $rootScope, $cookies) {
  this.state = $state;
  this.config = config;

  this.authenticationService = authenticationService;

  this.logout = function() {
    return $http.get(config.apiUrl + '/disconnect').finally(function() {
      $rootScope.globals = {};
      $cookies.remove('globals');
      $http.defaults.headers.common.Authorization = 'Bearer';
      return $state.go('index.login');
    });
  }

  this.init_();
}

MainNavController.prototype = {

  init_: function init_() {
    return this.authenticationService
      .getIdentity()
      .then(function(response) {
        // console.info(response);
        this.identity = response.data;
        return response;
      }.bind(this));
  }
};
