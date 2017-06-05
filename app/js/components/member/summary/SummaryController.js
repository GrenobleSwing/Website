function SummaryController($http, userDetails, config) {
  this.http = $http;
  this.userDetails = userDetails;

  this.$ok = false;
  this.totalAmount = 0;
  this.list = $http.get(config.apiUrl + '/account/'+userDetails.id+'/balance').then(function(response) {
    var data = response.data.details;
    this.list = [];
    if (data.length > 0) {
      this.list = data;
    }
    this.$ok = true;
    this.totalAmount = response.data.totalBalance;
  }.bind(this));
}
