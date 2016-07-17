/**
 * Dummy authentication for testing, uses $timeout to simulate api call
 */
function FakeAuthenticationService($http, $cookieStore, $rootScope, encoder, userResource, sessionService, authorizeService) {
  this.http = $http;
  this.cookieStore = $cookieStore;
  this.userResource = userResource;
  this.sessionService = sessionService;
  this.authorizeService = authorizeService;
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

    setCredentials : function setCredentials(user) {
      var authdata = this.encoder.encode(user.login + ':' + user.password);

        this.rootScope.globals = {
            currentUser: {
                userId: user.id,
                login: user.login,
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
        this.authorizeService.clearRoles();
    },

    handleResponse_ : function handleResponse_(user) {
      if(!!user.$ok) {
        this.setCredentials(user);
        this.sessionService.createSession(user, user.roles);
        this.authorizeService.changeRoles(user.roles);
      }
      return user;
    }
  };
