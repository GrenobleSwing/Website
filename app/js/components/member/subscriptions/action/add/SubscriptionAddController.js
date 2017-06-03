function SubscriptionAddController($scope, $modal, subscriptionService, subscriptionObservableService) {
  this.subscription = $scope.subscription;
  this.modal = $modal;
  this.subscriptionService = subscriptionService;
  this.subscriptionObservableService = subscriptionObservableService;
}

SubscriptionAddController.prototype = {
  validateSubscription : function validateSubscription() {
    var subscription = this.subscription;
    if (subscription.type == 'couple') {
      this.validateDuetSubscription_(subscription);
    } else {
      this.validateSoloSubscription_(subscription);
    }
  },

  validateSoloSubscription_: function validateSoloSubscription_(subscription) {
    subscription.selected = true;
    subscription.state = "SUBMITTED";

    this.subscriptionService.saveSubscription(subscription);

    for (var i = 0; i < subscription.requirements.length; i++) {
      this.subscriptionObservableService.notifyListeners(subscription.requirements[i]);
    }
  },

  validateDuetSubscription_: function validateDuetSubscription_(subscription) {
    var modalInstance = this.modal.open({
          animation: true,
          templateUrl: 'components/member/subscriptions/duet-dialog/subscription.duet.dialog.html',
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
          subscription.role = value.role;
          subscription.partnerName = value.partnerName;
          this.handleValidationSuccess_(subscription);
        }.bind(this), function () {

        });
  },

  handleValidationSuccess_: function handleValidationSuccess_(subscription) {
    subscription.selected = true;
    subscription.state = "SUBMITTED";

    this.subscriptionService.saveSubscription(subscription);

    for (var i = 0; i < subscription.requirements.length; i++) {
      this.subscriptionObservableService.notifyListeners(subscription.requirements[i]);
    }
  }
};
