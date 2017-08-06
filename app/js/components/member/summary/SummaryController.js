function SummaryController($scope, $http, userDetails, config) {
  this.http = $http;
  this.userDetails = userDetails;

  this.$ok = false;
  this.totalAmount = 0;
  this.list = $http.get(config.apiUrl + '/account/'+userDetails.id+'/balance').then(function(response) {
    var data = response.data.details;
    this.list = [];
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        this.list.push({
          "name" : k,
          "data": data[k]["Cours"]
        });
      }
    }
    this.$ok = true;
    this.totalAmount = response.data.totalBalance;
  }.bind(this));
}
