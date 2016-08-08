function SubscriptionDuetDescriptionController(subscriptionService, subscription) {
  this.subscriptionService = subscriptionService;
  this.subscription = {$ok: false};
  this.subscriptionId = subscription.id;
}

SubscriptionDuetDescriptionController.prototype = {

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
  },

  selectRole: function selectRole() {
    var subscription = this.subscription;
    var modalInstance = this.modal.open({
          animation: true,
          templateUrl: 'partials/subscription.duet.html',
          controller: 'subscriptionDuetController',
          controllerAs: 'ctrl',
          resolve: {
            role: function () {
              return subscription.role;
            },
            partnerName: function () {
              return subscription.partnerName;
            }
          }
        });

        modalInstance.result.then(function (value) {
          this.subscription.role = value.role;
          this.subscription.partnerName = value.partnerName;
          this.validateSubscription(subscription);
        }.bind(this), function () {

        });
  }

};
