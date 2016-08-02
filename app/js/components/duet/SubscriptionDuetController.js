function SubscriptionDuetController($scope, $modalInstance) {
  this.modalInstance = $modalInstance;
  this.role = $scope.data.role;
  this.partnerName = $scope.data.partnerName;
}

SubscriptionDuetController.prototype = {

  apply: function apply() {
    this.modalInstance.close({role: this.role, partnerName: this.partnerName});
  },

  cancel : function cancel() {
    this.modalInstance.dismiss('cancel');
  }
};
