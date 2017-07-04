function ActivityRemoveCategoryController($scope, $modal) {
  this.category = $scope.category;
  this.modal = $modal;
}

ActivityRemoveCategoryController.prototype = {

  showForm : function showForm() {
    var uri = this.category._links.remove;
    var modalInstance = this.modal.open({
        animation: true,
        template: '<section ng-bind-html="ctrl.content"></section>',
        controller: 'activityDialogController',
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
