function SubscriptionSummaryResource($resource, config) {
  this.resource = $resource(config.apiUrl + '/summary/:subscriptionId', {subscriptionId:'@id'}, {
    'get': { method:'GET' },
    'query':  { method:'GET', isArray:true },
  });

  this.init_();
}

SubscriptionSummaryResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    /**
  	 *
  	 * @return {
  	 *   id: %integer%,
  	 *   topicTitle: %string%,
  	 *   amount: %float%
  	 * }
  	 */
    getById: function getById(id) {
        return this.resource.get({subscriptionId: id}).$promise;
    },

    /**
  	 *
  	 * @return [{
  	 *   id: %integer%,
  	 *   topicTitle: %string%,
  	 *   amount: %float%
  	 * }, ...]
  	 */
	  getAll: function getAll(params) {
        return this.resource.query(params).$promise;
    },

    // private functions
    handleSuccess_ : function handleSuccess_(data) {
        return data;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { success: false, message: error };
        };
    }
};
