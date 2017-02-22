function BalanceResource($resource) {
  this.resource = $resource('/balance/:userId', {userId:'@id'}, {
    'get':    { method:'GET' },
    'query':  { method:'GET', isArray:true }
  });

  this.init_();
}

BalanceResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getByUserId: function getByUserId(id) {
        return this.resource.get(id).$promise;
    },

	  getAll: function getAll(params) {
        return this.resource.query(params).$promise;
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
