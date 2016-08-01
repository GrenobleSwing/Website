/**
 * Dummy authentication for testing, uses $timeout to simulate api call
 */
function AuthenticationResourceStub(userResource) {
  this.userResource = userResource;
}

AuthenticationResourceStub.prototype = {

    login: function login(username, password) {
        return this.userResource.getByUsername(username).then(this.handleResponse_);
    }
};
