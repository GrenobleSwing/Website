function SubscriptionsViewController(subscriptionService) {
  this.subscriptionService = subscriptionService;
  this.user = {id: 2};
  this.list = [];
  this.init_();
}

SubscriptionsViewController.prototype = {
    init_ : function init_() {
      this.list = this.listSubscriptions();
    },

    validateSubscription: function validateSubscription(subscription) {
      return this.subscriptionService.validateSubscription(subscription);
    },

    addSubscription : function addSubscription(topic) {
      this.subscriptionService.addSubscription(this.user, topic);
    },

    removeSubscription : function removeSubscription(subscriptionId) {
      this.subscriptionService.removeSubscription(subscriptionId);
    },

    listSubscriptions : function listSubscriptions() {
      this.list = this.subscriptionService.getByUser(this.user).then(function(data) {
        this.list = data;
      }.bind(this));
      return this.list;
    }
};
