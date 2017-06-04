function VenueResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

VenueResource.prototype = {
    init_ : function init_() {

    },

    getOne : function getOne(id) {
      return this.http.get(this.config.apiUrl + '/venue/' + id);
    },

    getAll : function getAll(query) {
      return this.http.get(this.config.apiUrl + '/venue', query);
    },

    create: function create(venue) {
        return this.http.post(this.config.apiUrl + '/venue', venue);
    },

    update: function update(venue) {
        return this.http.put(this.config.apiUrl + '/venue/' + venue.id, venue);
    },
};
