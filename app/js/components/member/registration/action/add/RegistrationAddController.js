function RegistrationAddController($scope, $modal) {
  this.registration = $scope.registration;
  this.modal = $modal;
}

RegistrationAddController.prototype = {

  showForm : function showForm() {
    var uri = this.registration._links.new_registration.href;
    var modalInstance = this.modal.open({
        animation: true,
        template: '<section ng-bind-html="ctrl.content"></section>',
        controller: 'registrationDialogController',
        controllerAs: 'ctrl',
        resolve: {
          content: ['$http', '$sce', 'config', function ($http, $sce, config) {
            return $http
              .get(config.apiUrl + uri)
              .then(function(response) {
                return $sce.trustAsHtml(response.data);
              });
          }]
        }
      });

    modalInstance.result.then(function (value) {

    }.bind(this), function () {

    });
  }
};
