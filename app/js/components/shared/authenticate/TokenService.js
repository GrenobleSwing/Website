function TokenService($q, tokenResource) {
  this.tokenResource = tokenResource;
  this.q = $q;

    this.init_();
}

TokenService.prototype = {
    init_ : function init_() {
      this.handleSuccess_ = this.handleSuccess_.bind(this);
    },

    isValid: function isValid() {
      return this.tokenResource.getToken().then(this.handleSuccess_);
    },

    handleSuccess_ : function handleSuccess_(response) {
      var deferred = this.q.defer();

      if (response.data.status === "NOK") {
        console.info("Token is NOK");
        deferred.reject(response.data);
      } else {
        console.info("Token is OK");
        deferred.resolve(response.data);
      }

      return deferred.promise;
    }
};
