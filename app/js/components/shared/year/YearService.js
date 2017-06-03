function YearService($http, config) {
  this.http = $http;
  this.config = config;
}

YearService.prototype = {

  getCurrentYear: function getCurrentYear(force) {
    return this.http.get(this.config.apiUrl + '/year/current', {cache : true});
  }
};
