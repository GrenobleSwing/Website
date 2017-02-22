function IdentityResource($http, config) {
  this.config = config;
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
      // console.info("IdentityResource#getCurrentUser");
      return this.http.get(this.config.apiUrl + '/identity'); //.then(this.handleSuccess_, this.handleError_('Error getting user by id'));
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
      // console.info("IdentityResource#getCurrentUser#handleSuccess_");
      // console.info(res);
      res.$ok = true;
      return res;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { $ok: false, message: error };
        };
    }
};
