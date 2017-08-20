function RegistrationAddController($scope, $modal, $state) {
  this.registration = $scope.registration;
  this.modal = $modal;
  this.$state = $state;
}

RegistrationAddController.prototype = {

  showForm : function showForm() {
    var uri = this.registration._links.new_registration.href;
    var modalInstance = this.modal.open({
        animation: true,
        template: '<div gs-dynamic="trustedHtml"></div>',
        controller: 'registrationDialogController',
        controllerAs: 'ctrl',
        resolve: {
          content: ['$http', 'config', function ($http, config) {
            return $http
              .get(config.apiUrl + uri.replace("/web/app_dev.php/api", "").replace('/api/api', '/api'))
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
