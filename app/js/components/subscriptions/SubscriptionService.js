function SubscriptionService(resource) {
  this.subscriptionResource = resource;

  this.init_();
}

SubscriptionService.prototype = {

    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getByUserId: function getByUser(userId) {
        return this.subscriptionResource.getAll({userId: userId}).then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
    },

    getAmountByUserId: function getAmountByUserId(userId) {
        return this.subscriptionResource.getAll({userId: userId}).then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
    },

    addSubscription: function addSubscription(userId, topicId) {
      return this.subscriptionResource.create({userId: userId, topicId: topicId}).then(this.handleSuccess_, this.handleError_('Error adding subscription'));
    },

    cancelSubscription: function cancelSubscription(userId, topicId) {
      return this.subscriptionResource.remove({userId: userId, topicId: topicId}).then(this.handleSuccess_, this.handleError_('Error cancelling subscription'));
    },

    validateSubscription: function validateSubscription(subscription) {
      return this.subscriptionResource.validate(subscription).then(this.handleSuccess_, this.handleError_('Error validating subscription'));
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
