function AuthResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

AuthResource.prototype = {
    init_ : function init_() {

    },

    authenticate: function authenticate(login, password) {
        return this.http.post(this.config.apiUrl + '/auth/', {login: login, password: password});
    },

    terminate: function terminate(identity) {
        return this.http.post(this.config.apiUrl + '/logout/', {login: identity.login});
    }
};
