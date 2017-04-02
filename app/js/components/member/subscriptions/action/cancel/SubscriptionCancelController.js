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
      this.subscriptionService.cancel(this.subscription).then(function() {
        this.subscription.selected = false;
        this.subscription.state = 'unpicked';
      }.bind(this));
    },
};
