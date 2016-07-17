function AuthenticationService($http, $cookieStore, $rootScope, encoder, sessionService, authorizeService) {
  this.http = $http;
  this.rootScope = $rootScope;
  this.cookieStore = $cookieStore;
  this.encoder = encoder;
  this.sessionService = sessionService;

  this.init_();
}

AuthenticationService.prototype = {
    init_ : function init_() {
      this.handleError_ = this.handleError_.bind(this);
      this.handleSuccess_ = this.handleSuccess_.bind(this);
    },

    login: function login(username, password, callback) {
        this.http.post('/api/authenticate', { username: username, password: password })
          .success(function (response) {
  			    response.$ok = true;
  				  this.setCredentials(response);
  				  this.http.get('/api/user/' + username).then(this.handleSuccess_, this.handleError_('Error creating session'));
            return response;
  			  })
          .error(function(response) {
            response.success = false;
            return response;
          })
          .then(callback);
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
        this.sessionService.clearSession();
    },

    // private functions
    handleSuccess_ : function handleSuccess_(user) {
      user.$ok = true;
      this.sessionService.createSession(user, user.roles);
      this.authorizeService.changeRoles(user.roles);
      return data;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { success: false, message: error };
        };
    }
};
