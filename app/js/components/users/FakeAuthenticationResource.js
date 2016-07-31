/**
 * Dummy authentication for testing, uses $timeout to simulate api call
 */
function FakeAuthenticationResource(userResource) {
  this.userResource = userResource;
}

FakeAuthenticationResource.prototype = {

    login: function login(username, password) {
        return this.userResource.getByUsername(username).then(this.handleResponse_);
    }
};
