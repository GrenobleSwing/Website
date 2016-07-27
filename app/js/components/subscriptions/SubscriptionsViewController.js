function SubscriptionsViewController(sessionService, subscriptionService) {
  this.subscriptionService = subscriptionService;
  this.userId = sessionService.userId;
  this.list = [];
  this.amount = 0;
  this.init_();
}

SubscriptionsViewController.prototype = {
    init_ : function init_() {
      this.handleInitSuccess_ = this.handleInitSuccess_.bind(this);
      this.handleAddSuccess_ = this.handleAddSuccess_.bind(this);
      this.handleRemoveSuccess_ = this.handleRemoveSuccess_.bind(this);

      this.list = this.subscriptionService.getByUserId(this.userId).then(this.handleInitSuccess_);
    },

    updateSubscription : function updateSubscription(subscription) {
      subscription.isLoading = true;
      if (!!subscription.selected) {
        this.subscriptionService.addSubscription(this.userId, subscription.topicId)
          .then(function() {
            subscription.isLoading = false;
          })
          .then(this.handleAddSuccess_);
      } else {
        this.subscriptionService.removeSubscription(this.userId, subscription.topicId)
          .then(function() {
            subscription.isLoading = false;
          })
          .then(this.handleRemoveSuccess_);
      }
    },

    handleInitSuccess_ : function handleInitSuccess_(data) {
      this.list = data;
      return this.list;
    },

    handleAddSuccess_ : function handleAddSuccess_(data) {
      return data;
    },

    handleRemoveSuccess_ : function handleRemoveSuccess_(data) {
      return data;
    }
};
