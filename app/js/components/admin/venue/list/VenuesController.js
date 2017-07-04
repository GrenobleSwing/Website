function VenuesController($http, config) {
  this.$ok = false;
  this.config = config;
  this.list = $http.get(config.apiUrl + '/venue').then(function(response) {
    this.list = response.data;
    this.$ok = true;
  }.bind(this));
}

VenuesController.prototype = {

  addVenue : function addVenue() {
    var uri = config.apiUrl + '/venue/new';
    var modalInstance = this.modal.open({
        animation: true,
        template: '<section ng-bind-html="ctrl.content"></section>',
        controller: 'dialogController',
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
  },

  editVenue : function editVenue(venue) {
    var uri = venue._links.edit.href;
    var modalInstance = this.modal.open({
        animation: true,
        template: '<section ng-bind-html="ctrl.content"></section>',
        controller: 'dialogController',
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
  },

  removeVenue : function removeVenue(venue) {
    var uri = venue._links.remove.href;
    var modalInstance = this.modal.open({
        animation: true,
        template: '<section ng-bind-html="ctrl.content"></section>',
        controller: 'dialogController',
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
