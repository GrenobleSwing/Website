function RegistrationCancelController($scope, $http, $state, config) {
  this.registration = $scope.registration;
  this.$state = $state;
  this.$http = $http;
  this.config = config;
}

RegistrationCancelController.prototype = {

  showForm : function showForm() {
    var uri = this.registration._links.cancel.href;
    this.$http
      .get(this.config.apiUrl + uri.replace("/web/app_dev.php/api", "").replace('/api/api', '/api'))
      .then(function(response) {
        return this.$state.reload();
      }.bind(this))
    }
};
