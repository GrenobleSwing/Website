/**
 * Dummy authentication for testing, uses $timeout to simulate api call
 */
function FakeAuthenticationService($http, $cookies, $rootScope, encoder, authResource) {
  this.http = $http;
  this.cookies = $cookies;
  this.authResource = authResource;

  this.encoder = encoder;
  this.rootScope = $rootScope;

  this.init_();
}

FakeAuthenticationService.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    login: function login(username, password) {
        return this.authResource.authenticate(username, password).then(this.handleSuccess_, this.handleError_);
    },

    clearCredentials : function clearCredentials() {
        this.rootScope.globals = {};
        this.cookies.remove('globals');
        this.http.defaults.headers.common.Authorization = 'Basic';
    },

    handleSuccess_ : function handleSuccess_(data) {
      this.rootScope.globals = {
        currentUser: {
            userId: data.id,
            token: this.encoder.encode(data.login)
        }
      };

      var expirationDate = new Date();
      expirationDate.setSeconds(data.expires_in);
      this.cookies.put('globals', this.rootScope.globals, {expires: expirationDate});

      this.http.defaults.headers.common['Authorization'] = 'Basic ' + data.token; // jshint ignore:line

      return data;
    },

    handleError_ : function handleError_() {
      console.info("FakeAuthenticationService#handleError_");
      return {$ok: false};
    }
  };
