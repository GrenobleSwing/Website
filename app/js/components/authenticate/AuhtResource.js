function AccountResource($http) {
  this.http = $http;

  this.init_();
}

AccountResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    authenticate: function authenticate(login, password) {
        return this.http.post('/api/auth/', {login: login, password: password}).then(this.handleSuccess_, this.handleError_('Error authenticating current user ' + login));
    },

    // remove: function remove(id) {
    //     return this.http.delete('/api/account/' + id).then(this.handleSuccess_, this.handleError_('Error deleting account'));
    // },

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
