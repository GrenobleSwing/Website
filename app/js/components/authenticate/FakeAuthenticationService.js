/**
 * Dummy authentication for testing, uses $timeout to simulate api call
 */
function FakeAuthenticationService($http, $cookies, $rootScope, encoder, userResource) {
  this.http = $http;
  this.cookies = $cookies;
  this.userResource = userResource;

  this.encoder = encoder;
  this.rootScope = $rootScope;

  this.init_();
}

FakeAuthenticationService.prototype = {
    init_ : function init_() {
        this.handleResponse_ = this.handleResponse_.bind(this);
    },

    login: function login(username, password) {
        return this.userResource.getByUsername(username).then(this.handleResponse_);
    },

    clearCredentials : function clearCredentials() {
        this.rootScope.globals = {};
        this.cookies.remove('globals');
        this.http.defaults.headers.common.Authorization = 'Basic';
    },

    handleResponse_ : function handleResponse_(data) {
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
    }
  };
