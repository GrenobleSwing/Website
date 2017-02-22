function YearResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

YearResource.prototype = {

    getCurrent: function getCurrent() {
        return this.http.get(this.config.apiUrl + '/year/current');
    },

    getNext: function getNext() {
        return this.http.get(this.config.apiUrl + '/year/next');
    },

    getPrevious: function getPrevious() {
        return this.http.get(this.config.apiUrl + '/year/previous');
    },

    getAll: function getAll() {
        return this.http.get(this.config.apiUrl + '/year/all');
    }
};
