function ActivitiesController($http, config, userDetails, activityDetails) {

  this.activity = activityDetails;

  this.year = $http.get(config.apiUrl + '/year/'+activityDetails.year).then(function(response) {
    return response.data;
  });

  this.categories = $http.get(config.apiUrl + '/activity/'+activityDetails.id + '/category').then(function(response) {
    return response.data;
  });

  this.discounts = $http.get(config.apiUrl + '/activity/'+activityDetails.id + '/discount').then(function(response) {
    return response.data;
  });

  this.topics = $http.get(config.apiUrl + '/activity/'+activityDetails.id + '/topic').then(function(response) {
    return response.data;
  });
}

ActivitiesController.prototype = {

};
