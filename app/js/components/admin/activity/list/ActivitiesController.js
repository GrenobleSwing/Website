function ActivitiesController($http, config) {
  this.$ok = false;
  this.list = $http.get(config.apiUrl + '/activity').then(function(response) {
    this.list = response.data;
    this.$ok = true;
  }.bind(this));
}

ActivitiesController.prototype = {

};
