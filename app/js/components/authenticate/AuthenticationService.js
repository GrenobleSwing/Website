function AuthenticationService($rootScope, $cookies, $http, authResource) {
  this.authResource = authResource;
  this.rootScope = $rootScope;
  this.cookies = $cookies;
  this.http = $http;

  this.init_();
}

AuthenticationService.prototype = {
    init_ : function init_() {
      this.handleError_ = this.handleError_.bind(this);
      this.handleSuccess_ = this.handleSuccess_.bind(this);
    },

    login: function login(username, password) {
      return this.authResource.authenticate(username, password).then(this.handleSuccess_, this.handleError_);
    },

    clearCredentials : function clearCredentials() {
        this.rootScope.globals = {};
        this.cookies.remove('globals');
        this.http.defaults.headers.common.Authorization = 'Basic';
    },

    // private functions
    handleSuccess_ : function handleSuccess_(data) {
      this.rootScope.globals = {
        currentUser: {
            userId: data.id,
            token: data.token
        }
      };

      var expirationDate = new Date();
      expirationDate.setSeconds(data.expires_in);
      this.cookies.put('globals', this.rootScope.globals, {expires: expirationDate});

      this.http.defaults.headers.common['Authorization'] = 'Basic ' + data.token; // jshint ignore:line

      return data;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { success: false, message: error };
        };
    }
};
