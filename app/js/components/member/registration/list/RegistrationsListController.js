function RegistrationsListController($q, $http, config, userDetails, year) {

  this.$ok = false;
  this.registrations = [];
  this.accountId = userDetails.id;
  var topicsPromise = $http
    .get(config.apiUrl + '/topic?yearId='+ year.id, { transformResponse :function(response, headersGetter, status) {
      var resp = JSON.parse(response);
      var array = [];
      var data;
      for (var i = 0; i < resp.length; i++) {
        data = {};
        data.id = resp[i].id;
        data.role="";
        data.state = "UNCHECKED";
        data.amountPaid = 0;
        data.options = [];
        data.withPartner = false;
        data.topic = {
         "id": resp[i].id,
         "title": resp[i].title,
         "type": resp[i].type,
         "description": resp[i].description,
        };
        data.accountId = this.accountId;
        data._links = resp[i]._links;
        array.push(data);
      }
      return array;
    }.bind(this)});

  var registrationsPromise = $http
    .get(config.apiUrl + '/account/'+userDetails.id+'/registrations?yearId='+ year.id);

  $q.all({topics : topicsPromise, registrations : registrationsPromise}).then(function(response) {
    var topics = angular.copy(response.topics.data);
    this.registrations = angular.copy(response.registrations.data);

    var found;
    var currentTopic;
    for (var i = 0; i < topics.length; i++) {
      currentTopic = topics[i];
      found = false;
      for (var j = 0; j < this.registrations.length; j++) {
        if (this.registrations[j].topic.id == currentTopic.topic.id) {
          found = true;
        }
      }
      if (!found) {
        this.registrations.push(currentTopic);
      }
    }
    this.$ok = true;
  }.bind(this));
}
