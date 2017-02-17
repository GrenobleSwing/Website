function SubscriptionService($q, resource) {
  this.q = $q;
  this.subscriptionResource = resource;

  this.subscriptions = [];
  this.subscriptionsLoaded = false;

  this.init_();
}

SubscriptionService.prototype = {

    init_ : function init_() {
        this.handleError_ = this.handleError_.bind(this);
    },

    getSubscriptionsByUserId: function getSubscriptionsByUserId(userId) {
      var deferred = this.q.defer();

      if (!!this.subscriptionsLoaded) {
          deferred.resolve(this.subscriptions);
          return deferred.promise;
      }

      this.subscriptionResource.getAll({userId: userId, yearId: "2016-2017"})
          .then(function(res) {
              this.subscriptions = angular.copy(res);
              deferred.resolve(this.subscriptions);
              return res;
          }, this.handleError_('Error retrieving subscriptions by User'));

      return deferred.promise;
    },

    getSubscriptionById: function getSubscriptionById(subscriptionId) {
        return this.subscriptionResource.getById(subscriptionId)
          .then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
    },

    cancelSubscription: function cancelSubscription(subscription) {
      return this.subscriptionResource.removeSubscription(subscription)
        .then(this.handleSuccess_, this.handleError_('Error cancelling subscription'));
    },

    saveSubscriptions : function saveSubscriptions(subscriptions) {
      this.subscriptionResource.updateSubscriptions(subscriptions);
    },

    saveSubscription : function saveSubscription(subscription) {
      this.subscriptionResource.updateSubscription(subscription);
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        return res;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { $ok: false, message: error };
        };
    }
};
