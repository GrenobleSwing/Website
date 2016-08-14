function FakeSubscriptionResource($timeout, $filter, $q, $resource) {
  this.timeout = $timeout;
  this.filter = $filter;
  this.q = $q;
  this.resource = $resource;

  this.subscriptionResource = this.resource('resources/sample/subscriptions.json', {},  {query: {method:'GET', isArray: true}});
  this.errorsResource = this.resource('resources/sample/validationErrors.json', {},  {query: {method:'GET', isArray: true}});

  this.init_();
}

FakeSubscriptionResource.prototype = {

  init_: function init_() {

  },

  getById : function getById(id) {
      var params = { id: id };
      return this.subscriptionResource.query().$promise.then(function(data) {
        var deferred = this.q.defer();
        var filtered = this.filter('filter')(data, params);
        var subscription = filtered.length ? filtered[0] : null;
        deferred.resolve(subscription);
        return deferred.promise;
      }.bind(this));
  },

  getAll: function getAll(params) {
    return this.subscriptionResource.query().$promise.then(function(data) {
      var deferred = this.q.defer();
      var filtered = this.filter('filter')(data, params);
      deferred.resolve(filtered);
      return deferred.promise;
    }.bind(this));
  },

  validate: function validate(subscription) {
    var deferred = this.q.defer();
    deferred.resolve(this.errors);
    return deferred.promise;
  },

  create: function create(subscription) {
      var deferred = this.q.defer();

      // simulate api call with $timeout
      var filtered = this.filter('filter')(this.subscriptions, { id: subscription.id });
      if (filtered.length > 0) {
          deferred.resolve({ success: false, message: 'Subscription "' + subscription.name + '" is already taken' });
      } else {
          var lastSubscription = subscriptions[this.subscription.length - 1] || { id: 0 };
          infos.id = lastSubscription.id + 1;

          // save to local storage
          this.subscriptions.push(subscription);

          deferred.resolve({ success: true });
      }

      return deferred.promise;
  },

  updateSubscriptions: function updateSubscriptions(subscriptions) {
      var deferred = this.q.defer();
      deferred.resolve();
      return deferred.promise;
  },

  updateSubscription: function updateSubscription(subscription) {
    // var deferred = this.q.defer();
    //
    // for (var i = 0; i < this.subscriptions.length; i++) {
    //     if (this.subscriptions[i].id === subscription.id) {
    //         this.subscriptions[i] = subscription;
    //         break;
    //     }
    // }
    // deferred.resolve();
    //
    // return deferred.promise;
    var deferred = this.q.defer();
    deferred.resolve();
    return deferred.promise;
  },

  remove: function remove(id) {
      var deferred = $q.defer();

      for (var i = 0; i < this.subscriptions.length; i++) {
          var subscription = this.subscriptions[i];
          if (subscription.id === id) {
              this.subscription.splice(i, 1);
              break;
          }
      }
      deferred.resolve();

      return deferred.promise;
  }

};
