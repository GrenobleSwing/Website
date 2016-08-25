function SummaryService($q, resource) {
  this.q = $q;
  this.subscriptionResource = resource;

  this.subscriptions = [];
  this.subscriptionsLoaded = false;

  this.init_();
}

SummaryService.prototype = {

    init_ : function init_() {
        this.handleError_ = this.handleError_.bind(this);
    },

    getSubscriptionsByUserId: function getSubscriptionsByUserId(userId) {
      return this.subscriptionResource.getAll({userId: userId, yearId: "2016-2017"});
    },

    getAmountByUserId: function getAmountByUserId(userId) {
      return this.subscriptionResource.getAmount({userId: userId, yearId: "2016-2017"});
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
