function SubscriptionPayController($scope, commandService) {
  this.subscription = $scope.subscription;
  this.commandService = commandService;
}
SubscriptionPayController.prototype = {

  isPayable : function isPayable() {
    return true;
  },

  paySubscription: function paySubscription() {

  }
};
