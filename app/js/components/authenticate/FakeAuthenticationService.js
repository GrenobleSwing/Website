/**
 * Dummy authentication for testing, uses $timeout to simulate api call
 */
function FakeAuthenticationService($http, $cookieStore, $rootScope, encoder, currentUserService) {
  this.http = $http;
  this.cookieStore = $cookieStore;
  this.currentUserService = currentUserService;
  this.encoder = encoder;
  this.rootScope = $rootScope;

  this.init_();
}

FakeAuthenticationService.prototype = {
    init_ : function init_() {
        this.handleResponse_ = this.handleResponse_.bind(this);
    },

    login: function login(username, password) {
        return this.currentUserService.getByLogin(username)
        .then(this.handleResponse_);
    },

    setCredentials : function setCredentials(username, password) {
        var authdata = this.encoder.encode(username + ':' + password);

        this.rootScope.globals = {
            currentUser: {
                login: username,
                authdata: authdata
            }
        };

        this.http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
        this.cookieStore.put('globals', this.rootScope.globals);
    },

    clearCredentials : function clearCredentials() {
        this.rootScope.globals = {};
        this.cookieStore.remove('globals');
        this.http.defaults.headers.common.Authorization = 'Basic';
    },

    handleResponse_ : function handleResponse_(user) {
      if(user.$ok) {
        this.setCredentials(user.login, user.password);
      }
      return user;
    }
  };
