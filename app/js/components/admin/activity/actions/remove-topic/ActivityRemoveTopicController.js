function ActivityRemoveTopicController($scope, $modal) {
  this.topic = $scope.topic;
  this.modal = $modal;
}

ActivityRemoveTopicController.prototype = {

  showForm : function showForm() {
    var uri = this.topic._links.remove;
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
