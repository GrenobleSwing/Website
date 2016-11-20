function SubscriptionResource($resource, config) {
  this.resource = $resource(config.apiUrl + '/api/subscription/:subscriptionId', {subscriptionId:'@id'}, {
    'get': { method:'GET' },
    'getAmount': { method:'GET' },
    'validate': { method:'GET' },
    'create': { method:'POST' },
    'update': { method:'PUT' },
    'query':  { method:'GET', isArray:true },
    'delete': { method:'DELETE' }
  });

  this.init_();
}

SubscriptionResource.prototype = {
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
        return this.resource.get({subscriptionId: id}).$promise.then(this.handleSuccess_, this.handleError_('Error getting subscription by id'));
    },

    getAmountByUserId: function getAmountByUserId(userId) {
        return this.resource.getAmount(userId).$promise.then(this.handleSuccess_, this.handleError_('Error getting subscription by id'));
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
        return this.resource.query(params).$promise.then(this.handleSuccess_, this.handleError_('Error getting all subscriptions'));
    },

    /**
  	 *
  	 * @param [{
     *   userId: %integer%,
  	 *   topicId: %integer%,
  	 *   selected: %boolean%
  	 * }, ...]
  	 */
    updateSubscriptions: function updateSubscriptions(subscriptions) {
        return this.resource.update(subscriptions).success(this.handleSuccess_).error(this.handleError_('Error updating subscription'));
    },

    updateSubscription: function updateSubscription(subscription) {
        return this.resource.update(subscription).success(this.handleSuccess_).error(this.handleError_('Error updating subscription'));
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
