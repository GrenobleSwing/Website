function SubscriptionValidateController($scope, commandService) {
  this.subscription = $scope.subscription;
  this.commandService = commandService;
}

SubscriptionValidateController.prototype = {
  validateSubscription : function validateSubscription() {
    var subscription = this.subscription;
  }

};
