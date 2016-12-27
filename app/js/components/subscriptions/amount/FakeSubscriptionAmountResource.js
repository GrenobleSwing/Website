function FakeSubscriptionAmountResource($filter, $q, $resource) {
  this.filter = $filter;
  this.q = $q;
  this.resource = $resource;

  this.subscriptionResource = this.resource('resources/sample/subscriptions.json', {},  {query: {method:'GET', isArray: true}});
  this.errorsResource = this.resource('resources/sample/validationErrors.json', {},  {query: {method:'GET', isArray: true}});

  this.init_();
}

FakeSubscriptionAmountResource.prototype = {

  init_: function init_() {

  },

  getAmountByUserId : function getAmountByUserId(id) {

      return this.subscriptionResource.query().$promise.then(function(data) {
        var deferred = this.q.defer();
        var amount = 0;
        var filtered = this.filter('filter')(data, { userId: id, selected : true, state: 'waiting_for_payment' });
        for (var i = 0; i < filtered.length; i++) {
          amount += filtered[i].amount;
        }
        deferred.resolve(amount);
        return deferred.promise;
      }.bind(this));
  }
};
