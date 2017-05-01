function ActivityResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

ActivityResource.prototype = {
    init_ : function init_() {

    },

    getOne : function getOne(id) {
      return this.http.get(this.config.apiUrl + '/activity/' + id);
    },

    create: function create(activity) {
        return this.http.post(this.config.apiUrl + '/activity', activity);
    },

    update: function update(activity) {
        return this.http.put(this.config.apiUrl + '/activity/' + activity.id, activity);
    },
};
