function SubscriptionAddController($scope, $modal, subscriptionService) {
  this.scope = $scope;
  this.modal = $modal;
  this.subscriptionService = subscriptionService;
}

SubscriptionAddController.prototype = {
  validateSubscription : function validateSubscription() {
    var subscription = this.scope.subscription;
    if (subscription.type == 'solo') {
      this.validateSoloSubscription_(subscription);
    } else {
      this.validateDuetSubscription_(subscription);
    }
  },

  validateSoloSubscription_: function validateSoloSubscription_(subscription) {
    subscription.selected = true;
    subscription.state = "waiting_for_payment";

    this.subscriptionService.saveSubscription(subscription);

    for (var i = 0; i < subscription.requirements.length; i++) {
      this.subscriptionObservableService.notifyListeners(subscription.requirements[i]);
    }
  },

  validateDuetSubscription_: function validateDuetSubscription_(subscription) {
    var modalInstance = this.modal.open({
          animation: true,
          templateUrl: 'components/subscriptions/duet-dialog/subscription.duet.dialog.html',
          controller: 'subscriptionDuetDialogController',
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
          this.handleValidationSuccess_(subscription);
        }.bind(this), function () {

        });
  },

  handleValidationSuccess_: function handleValidationSuccess_() {
    this.subscription.selected = true;
    this.subscription.state = "waiting_for_payment";

    this.subscriptionService.saveSubscription(this.subscription);

    for (var i = 0; i < this.subscription.requirements.length; i++) {
      this.subscriptionObservableService.notifyListeners(this.subscription.requirements[i]);
    }
  }
};
