function SubscriptionService(resource) {
  this.subscriptionResource = resource;

  this.init_();
}

SubscriptionService.prototype = {

    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getByUser: function getByUser(user) {
        return this.subscriptionResource.getAll({userId: user.id}).then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
    },

    addSubscription: function addSubscription(user, topic) {
      return this.subscriptionResource.create({userId: user.id, topicId: topic.id}).then(this.handleSuccess_, this.handleError_('Error adding subscription'));
    },

    cancelSubscription: function cancelSubscription(subscription) {
      return this.subscriptionResource.remove(subscription.id).then(this.handleSuccess_, this.handleError_('Error cancelling subscription'));
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
