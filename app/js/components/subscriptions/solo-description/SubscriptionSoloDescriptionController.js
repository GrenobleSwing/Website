function SubscriptionSoloDescriptionController($scope, subscriptionService, subscriptionObservableService) {
  this.scope = $scope;
  this.subscriptionService = subscriptionService;
  this.subscription = {$ok: false};
  this.subscriptionId = $scope.subscription.id;
  this.subscriptionObservableService = subscriptionObservableService;

  this.init_();
}

SubscriptionSoloDescriptionController.prototype = {

  init_: function init_() {
    this.activateSubscription_ = this.activateSubscription_.bind(this);
    this.handleDestroy_ = this.handleDestroy_.bind(this);

    this.subscriptionObservableService.addListener(this.activateSubscription_);

    this.subscription = this.subscriptionService.getSubscriptionById(this.subscriptionId).then(function(data) {
      this.subscription = data;
      this.subscription.$ok = true;
    }.bind(this));

    this.scope.$on("$destroy", this.handleDestroy_);
  },

  validateSubscription: function validateSubscription() {
    this.subscription.selected = true;
    this.subscription.state = "waiting_for_payment";

    this.subscriptionService.saveSubscription(this.subscription);

    for (var i = 0; i < this.subscription.requirements.length; i++) {
      this.subscriptionObservableService.notifyListeners(this.subscription.requirements[i]);
    }
  },

  activateSubscription_: function activateSubscription_(data) {
    if (data.topicId === this.subscription.topicId && !this.subscription.selected) {
      console.info("Activate subscription to " + this.subscription.topicTitle);
      this.subscription.isOpen = true;
      this.validateSubscription();
    }
  },

  isCancellable : function isCancellable() {
    return true;
  },

  cancelSubscription: function cancelSubscription() {
    this.subscriptionService.cancelSubscription(this.subscription).then(function() {

    }.bind(this));
  },

  handleDestroy_: function handleDestroy_() {
    this.subscriptionObservableService.removeListener(this.activateSubscription_);
  }
};
