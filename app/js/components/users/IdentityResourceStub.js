function IdentityResourceStub($q) {
  this.q = $q;
  
  this.init_();
}

IdentityResourceStub.prototype = {
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
      var deferred = this.q.defer();
      var user = {id: 2, login: 'john.doe@test.com', roles: ["USER"]};
      deferred.resolve(user);
      return deferred.promise;
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
