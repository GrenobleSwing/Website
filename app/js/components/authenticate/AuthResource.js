function AuthResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

AuthResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    authenticate: function authenticate(login, password) {
        return this.http.post(this.config.apiUrl + '/api/auth/', {login: login, password: password}).then(this.handleSuccess_, this.handleError_('Error authenticating current user ' + login));
    },

    terminate: function terminate(identity) {
        return this.http.post(this.config.apiUrl + '/api/logout/', {login: identity.login}).then(this.handleSuccess_, this.handleError_('Error disconnecting current user ' + identity.login));
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        return res.data;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { success: false, message: error };
        };
    }
};
