function SubscriptionService(resource) {
  this.subscriptionResource = resource;

  this.init_();
}

SubscriptionService.prototype = {

    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getSubscriptionsByUserId: function getSubscriptionsByUserId(userId) {
        return this.subscriptionResource.getAll({userId: userId})
          .then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
    },

    getSubscriptionById: function getSubscriptionById(subscriptionId) {
        return this.subscriptionResource.getById(subscriptionId)
          .then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
    },

    cancelSubscription: function cancelSubscription(userId, topicId) {
      return this.subscriptionResource.remove({userId: userId, topicId: topicId})
        .then(this.handleSuccess_, this.handleError_('Error cancelling subscription'));
    },

    saveSubscriptions : function saveSubscriptions(subscriptions) {
      this.subscriptionResource.updateSubscriptions(subscriptions);
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        // res.$ok = true;
        return res;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { $ok: false, message: error };
        };
    }
};
