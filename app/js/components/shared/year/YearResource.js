function YearResource($http, config) {
  this.http = $http;
  this.config = config;
}

YearResource.prototype = {

    getCurrent: function getCurrent() {
        return this.http.get(this.config.apiUrl + '/year/current', {cache : true});
    },

    getNext: function getNext() {
        return this.http.get(this.config.apiUrl + '/year/next', {cache : true});
    },

    getPrevious: function getPrevious() {
        return this.http.get(this.config.apiUrl + '/year/previous');
    },

    getAll: function getAll() {
        return this.http.get(this.config.apiUrl + '/year');
    }
};
