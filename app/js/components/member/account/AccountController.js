function AccountController($http, config, userDetails, $sce) {
  this.$ok = false;
  this.content = $http.get(config.apiUrl + '/account/'+userDetails.id+'/edit').then(function(response) {
    this.content = $sce.trustAsHtml(response.data);
    this.$ok = true;
  }.bind(this));
}
