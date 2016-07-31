/**
 * Dummy authentication for testing, uses $timeout to simulate api call
 */
function AuthenticationResource($http) {
  this.http = http;
}

AuthenticationResource.prototype = {
    login: function login(username, password) {
        return this.http.post('/api/authenticate', { username: login, password: password});
    }
};
