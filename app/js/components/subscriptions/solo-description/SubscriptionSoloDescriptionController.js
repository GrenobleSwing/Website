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

    this.subscriptionObservableService.notifyListeners(this.subscription);
  },

  activateSubscription_: function activateSubscription_(data) {
    if (data.id === this.subscription.id && !this.subscription.selected) {
      this.validateSubscription();
    }
  },

  handleDestroy_: function handleDestroy_() {
    this.subscriptionObservableService.removeListener(this.activateSubscription_);
  }
};
