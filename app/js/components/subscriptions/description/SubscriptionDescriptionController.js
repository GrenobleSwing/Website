function SubscriptionDuetController($scope, $modalInstance, role, partnerName) {
  this.modalInstance = $modalInstance;
  this.role = role;
  this.partnerName = partnerName;
}

SubscriptionDuetController.prototype = {

  apply: function apply() {
    this.modalInstance.close({role: this.role, partnerName: this.partnerName});
  },

  cancel : function cancel() {
    this.modalInstance.dismiss('cancel');
  }
};
