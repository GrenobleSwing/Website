function TokenResource($http, config) {
  this.http = $http;
  this.config = config;
}

TokenResource.prototype = {
    getToken: function getToken() {
        return this.http.get(this.config.apiUrl + '/token/');
    }
};
