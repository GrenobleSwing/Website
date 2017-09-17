function SummaryController($scope, $http, userDetails, config, $sce) {
  this.http = $http;
  this.userDetails = userDetails;

  this.$ok = false;
  this.totalAmount = 0;
  this.list = $http.get(config.apiUrl + '/account/'+userDetails.id+'/balance').then(function(response) {

    this.list = response.data.details;
    this.$ok = true;
    this.totalAmount = response.data.totalBalance;
    this.trustedHtml = $sce.trustAsHtml(response.data.buttons);
  }.bind(this));
}
