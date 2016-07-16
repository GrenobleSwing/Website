function SubscriptionResource($resource) {
  this.resource = $resource('/api/subscription/:subscriptionId', {subscriptionId:'@id'}, {
    'get':    { method:'GET' },
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

    getById: function getById(id) {
        return this.resource.get(id).then(this.handleSuccess_, this.handleError_('Error getting subscription by id'));
    },

	  getAll: function getAll(params) {
        return this.resource.query(params).then(this.handleSuccess_, this.handleError_('Error getting all subscriptions'));
    },

    create: function create(subscription) {
        return this.resource.create(subscription).then(this.handleSuccess_, this.handleError_('Error creating subscription'));
    },

    update: function update(subscription) {
        return this.resource.update(subscription).then(this.handleSuccess_, this.handleError_('Error updating subscription'));
    },

    remove: function remove(id) {
        return this.resource.delete(id).then(this.handleSuccess_, this.handleError_('Error deleting subscription'));
    },

    validate: function validate(subscription) {
        return this.resource.validate(subscription).then(this.handleSuccess_, this.handleError_('Error validating subscription'));
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