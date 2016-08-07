function IdentityResource($http) {
  this.http = $http;

  this.init_();
}

IdentityResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    /**
  	 *
  	 * @return {
     *  id: %integer%,
     *  login: %email%,
     *  authdata: %string%
     * }
  	 */
    getCurrentUser: function getCurrentUser() {
        return this.http.get('/api/identity').then(this.handleSuccess_, this.handleError_('Error getting user by id'));
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
      res.$ok = true;
      return res;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { $ok: false, message: error };
        };
    }
};
