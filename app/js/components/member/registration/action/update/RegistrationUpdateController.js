function RegistrationUpdateController($scope, $modal, $state) {
  this.registration = $scope.registration;
  this.modal = $modal;
  this.$state = $state;
}

RegistrationUpdateController.prototype = {

  showForm: function showForm() {
    var uri = this.registration._links.edit.href;

    var modalInstance = this.modal.open({
        animation: true,
        template: '<div gs-dynamic="trustedHtml"></div>',
        controller: 'registrationEditDialogController',
        controllerAs: 'ctrl',
        resolve: {
          content: ['$http', '$sce', 'config', function ($http, $sce, config) {
            return $http
              .get(config.apiUrl + uri.replace("/web/app_dev.php", "").replace('/api', ''))
              .then(function(response) {
                return response;
              });
          }]
        }
      });

    modalInstance.result.then(function (value) {
      return this.$state.reload();
    }.bind(this), function () {

    });
  }
};
