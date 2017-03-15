function SubscriptionRemoveController($scope, commandService) {
  this.subscription = $scope.subscription;
  this.commandService = commandService;
}

SubscriptionRemoveController.prototype = {

    isRemovable : function isRemovable() {
      return true;
    },

    removeSubscription: function removeSubscription() {
      this.subscriptionService.cancelSubscription(this.subscription).then(function() {

      }.bind(this));
    },
};
