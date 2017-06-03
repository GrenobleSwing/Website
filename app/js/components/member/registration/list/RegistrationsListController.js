function RegistrationsListController($http, config, userDetails, year) {

  this.list = $http
    .get(config.apiUrl + 'api/account/'+account.id+'/registrations?yearId='+ year.id)
    .then(function handleInitSuccess_(data) {
      this.list = angular.copy(response.data);
      return this.list;
    });
}
