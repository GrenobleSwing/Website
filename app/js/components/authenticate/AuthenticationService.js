function AuthenticationService($http, $cookieStore, $rootScope, encoder, currentUserService) {
  this.http = $http;
  this.rootScope = $rootScope;
  this.cookieStore = $cookieStore;
  this.encoder = encoder;
  this.currentUserService = currentUserService;

  this.init_();
}

AuthenticationService.prototype = {
    init_ : function init_() {
      this.handleSuccess_ = this.handleSuccess_.bind(this);
    },

    login: function login(username, password, callback) {
        this.http.post('/api/authenticate', { username: username, password: password })
           .success(function (response) {
      			    response.success = true;
      				  this.setCredentials(username, password);
      				  this.currentUserService.getByLogin(username);
                return response;
      			  }).error(function(response) {
          response.success = false;
          return response;
        }).then(callback);
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
    }
};
