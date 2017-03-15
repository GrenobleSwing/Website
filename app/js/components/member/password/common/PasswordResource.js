function PasswordResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

PasswordResource.prototype = {
    init_ : function init_() {

    },

    change: function change(account, data) {
        return this.http.put(this.config.apiUrl + '/password/' + account.id, data).$promise;
    }
};
