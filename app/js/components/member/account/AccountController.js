function AccountController($http, config, userDetails, $sce) {
  this.content = $http.get(config.apiUrl + '/account/'+userDetails.id+'/edit').then(function(response) {
    this.content = $sce.trustAsHtml(response.data);
  }.bind(this));
}
