function SubscriptionSoloDescriptionController(subscriptionService, subscription) {
  this.subscriptionService = subscriptionService;
  this.subscription = {$ok: false};
  this.subscriptionId = subscription.id;
}

SubscriptionSoloDescriptionController.prototype = {

  init_: function init_() {
    this.subscription = this.subscriptionService.getSubscriptionById(this.subscriptionId).then(function(data) {
      this.subscription = data;
      this.subscription.$ok = true;
    }.bind(this));
  },

  validateSubscription: function validateSubscription() {
    this.subscription.selected = true;
    this.subscription.state = "waiting_for_payment";

    var requiredSubscription = this.subscription.requiredSubscriptions.length ? requiredSubscriptions[0] : {topicId: 0, description: "not found"};
    if (requiredSubscription.topicId !== 0 && !requiredSubscription.selected) {
      requiredSubscription.selected = true;
      requiredSubscription.state = "waiting_for_payment";
    }

    this.dirty = true;
  }
};
