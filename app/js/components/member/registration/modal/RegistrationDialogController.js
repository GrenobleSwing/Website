function RegistrationDialogController($scope, $modalInstance, content) {
  this.modalInstance = $modalInstance;
  this.content = content;
  this.scope = $scope;
}

RegistrationDialogController.prototype = {

  apply: function apply() {
    if (this.scope.form.content.$valid) {
        this.modalInstance.close('close');
    } else {
        console.log('form is not in scope');
    }
  },

  cancel : function cancel() {
    this.modalInstance.dismiss('cancel');
  }
};
