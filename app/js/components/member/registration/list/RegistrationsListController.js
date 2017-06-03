function RegistrationsListController($http, config, userDetails, year) {

  this.$ok = false;
  this.list = $http
    .get(config.apiUrl + '/account/'+userDetails.id+'/registrations?yearId='+ year.id)
    .then(function(response) {
      this.$ok = true;
      this.list = angular.copy(response.data);
      return this.list;
    });
}
