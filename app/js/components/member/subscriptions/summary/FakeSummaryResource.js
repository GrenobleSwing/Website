function FakeSummaryResource($timeout, $filter, $q, $resource) {
  this.timeout = $timeout;
  this.filter = $filter;
  this.q = $q;
  this.resource = $resource;

  this.subscriptionResource = this.resource('resources/sample/summary.json', {},  {query: {method:'GET', isArray: true}});

  this.init_();
}

FakeSummaryResource.prototype = {

  init_: function init_() {

  },

  getAll: function getAll(params) {
    return this.subscriptionResource.query().$promise.then(function(data) {
      var deferred = this.q.defer();
      var filtered = this.filter('filter')(data, params);
      deferred.resolve(filtered);
      return deferred.promise;
    }.bind(this));
  },

  getAmount: function getAmount(params) {
    return this.subscriptionResource.query().$promise.then(function(data) {
      var deferred = this.q.defer();
      var filtered = this.filter('filter')(data, params);

      var sum = 0;
      angular.forEach(filtered,function(value){
          sum = sum + parseInt(value.amount);
      });
      deferred.resolve(sum);
      return deferred.promise;
    }.bind(this));

  }

};
