function ActivityRemoveController($scope, $modal) {
  this.activity = $scope.activity;
  this.modal = $modal;
}

ActivityRemoveController.prototype = {

  showForm : function showForm() {
    var uri = this.activity._links.remove.href;
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
