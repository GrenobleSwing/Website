function YearService($cookies, $q, yearResource) {
  this.cookies = $cookies;
  this.q = $q;
  this.yearResource = yearResource;
  this.observerService = observerService;
  this.timeout = $timeout;

  this.authenticated = false;

  this.unIndentified = {$ok : false, roles : []};
}

YearService.prototype = {

  setYears_ : function setYears_(years) {
    this.cookies.putObject('current-year', years.current);
    this.cookies.putObject('next-year', years.next);
  },

  getYear_ : function getYear_() {
    return this.cookies.getObject('current-year');
  },

  getCurrentYear: function getCurrentYear(force) {
    console.info("YearService#getCurrentYear 1");

    var deferred = this.q.defer();

    // check and see if we have retrieved the year data from the server. if we have, reuse it by immediately resolving
    if (!force) {
      console.info("YearService#getCurrentYear 2");
      deferred.resolve(this.getYear_().current);

      return deferred.promise;
    }

    console.info("YearService#getCurrentYear 3");

    // otherwise, retrieve the year data from the server, update the year object, and then resolve.
    this.yearResource.getAll().then(
      function(data) {
        console.info("YearService#getCurrentYear success");
        console.info(data);
        var years = angular.copy(data.data);
        this.setYears_(years);
        deferred.resolve(years.current);
      }.bind(this));

    return deferred.promise;
  }
};
