function SubscriptionCancelController($scope, $modal, subscriptionService) {
  this.subscription = $scope.subscription;
  this.modal = $modal;
  this.subscriptionService = subscriptionService;
}

SubscriptionCancelController.prototype = {

    isCancellable : function isCancellable() {
      return true;
    },

    cancelSubscription: function cancelSubscription() {
      this.subscriptionService.cancelSubscription(this.subscription).then(function() {

      }.bind(this));
    },
};
