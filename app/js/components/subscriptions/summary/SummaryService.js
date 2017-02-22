function SummaryService(resource) {

  this.subscriptionResource = resource;

  this.currentYear = yearService.getCurrentYear();

  this.subscriptions = [];
  this.subscriptionsLoaded = false;

  this.init_();
}

SummaryService.prototype = {

    init_ : function init_() {
        this.handleError_ = this.handleError_.bind(this);
    },

    getSubscriptionsByUserId: function getSubscriptionsByUserId(userId) {
      return this.subscriptionResource.getAll({userId: userId, yearId: this.currentYear});
    },

    getAmountByUserId: function getAmountByUserId(userId) {
      return this.subscriptionResource.getAmount({userId: userId, yearId: this.currentYear});
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
