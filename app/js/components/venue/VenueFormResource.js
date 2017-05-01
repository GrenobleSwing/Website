function VenueFormResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

VenueFormResource.prototype = {
    init_ : function init_() {

    },

    getCreateForm : function getCreateForm() {
      return this.http.get(this.config.apiUrl + '/venue/new');
    },

    getEditForm: function getEditForm(venue) {
        return this.http.get(this.config.apiUrl + '/venue/'+venue.id+'/edit');
    }
};
