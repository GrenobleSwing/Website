function BalanceResource($resource) {
  this.resource = $resource('/topic-type', {}, {
    'query':  { method:'GET', isArray:true }
  });

  this.init_();
}

BalanceResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

	  getAll: function getAll() {
        return this.resource.query().$promise;
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
