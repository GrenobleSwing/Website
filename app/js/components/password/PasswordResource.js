function PasswordResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

PasswordResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    change: function change(account, data) {
        return this.http.put(this.config.apiUrl + '/api/account/change-password/' + account.id, data).then(this.handleSuccess_, this.handleError_('Error changing password'));
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
