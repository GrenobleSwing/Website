function SubscriptionUpdateController($scope, $modal, subscriptionService) {
  this.subscription = $scope.subscription;
  this.modal = $modal;
  this.subscriptionService = subscriptionService;
}
SubscriptionUpdateController.prototype = {

  isUpdatable : function isUpdatable() {
    return true;
  },

  updateSubscription: function updateSubscription() {
    var subscription = this.subscription;
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
        this.subscription.role = value.role;
        this.subscription.partnerName = value.partnerName;
        this.handleUpdateSuccess_(subscription);
      }.bind(this), function () {

      });
  }
};
