function YearService($cookies, $q, yearResource) {
  this.cookies = $cookies;
  this.q = $q;
  this.yearResource = yearResource;
}

YearService.prototype = {

  getYear_ : function getYear_() {
    return this.cookies.getObject('current-year');
  },

  getCurrentYear: function getCurrentYear(force) {
    console.info("YearService#getCurrentYear 1");

    var deferred = this.q.defer();

    console.info("YearService#getCurrentYear 3");

    // otherwise, retrieve the year data from the server, update the year object, and then resolve.
    this.yearResource.getCurrent().then(
      function(data) {
        console.info("YearService#getCurrentYear success");
        console.info(data);
        this.cookies.putObject('current-year', data.data.current);
        deferred.resolve(data.data.current);
      }.bind(this));

    return deferred.promise;
  }
};
