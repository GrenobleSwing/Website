function AuthResource($http, config) {
  this.http = $http;
  this.config = config;
}

AuthResource.prototype = {

    authenticate: function authenticate(login, password) {
        return this.http.post(this.config.apiUrl + '/auth', {"login": login, "password": password});
    },

    getCurrentUser: function getCurrentUser() {
      // console.info("IdentityResource#getCurrentUser");
      return this.http.get(this.config.apiUrl + '/identity', { cache: true, transformResponse: function(response, headersGetter, status) {
        console.info(response);
        var data = JSON.parse(response);
        data.login = data.email;
        console.info(data);
        return data;
      }});
    },

    terminate: function terminate(identity) {
        return this.http.post(this.config.apiUrl + '/logout', {login: identity.login});
    }
};
