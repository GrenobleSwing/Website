function BalanceResource($resource) {
  this.resource = $resource('/api/balance/:userId', {userId:'@id'}, {
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
        return this.resource.get(id).then(this.handleSuccess_, this.handleError_('Error getting subscription by id'));
    },

	  getAll: function getAll(params) {
        return this.resource.query(params).then(this.handleSuccess_, this.handleError_('Error getting all subscriptions'));
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
