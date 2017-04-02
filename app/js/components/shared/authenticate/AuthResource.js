function AuthResource($http, config) {
  this.http = $http;
  this.config = config;
}

AuthResource.prototype = {

    authenticate: function authenticate(login, password) {
        return this.http.post(this.config.apiUrl + '/auth/', {login: login, password: password});
    },

    getCurrentUser: function getCurrentUser() {
      // console.info("IdentityResource#getCurrentUser");
      return this.http.get(this.config.apiUrl + '/identity', { cache: true}); //.then(this.handleSuccess_, this.handleError_('Error getting user by id'));
    },

    terminate: function terminate(identity) {
        return this.http.post(this.config.apiUrl + '/logout/', {login: identity.login});
    }
};
