function SummaryService(resource, yearService) {

  this.subscriptionResource = resource;

  this.yearService = yearService;

  this.subscriptions = [];
  this.subscriptionsLoaded = false;

  this.init_();
}

SummaryService.prototype = {

    init_ : function init_() {

    },

    getSubscriptionsByUserId: function getSubscriptionsByUserId(userId) {
      return this.yearService
        .getCurrentYear()
        .then(function(data) {
          this.subscriptionResource.getAll = this.subscriptionResource.getAll.bind(this.subscriptionResource);
          return this.subscriptionResource.getAll({userId: userId, yearId: data.id});
        }.bind(this));
    },

    getAmountByUserId: function getAmountByUserId(userId) {
      return this.yearService
        .getCurrentYear()
        .then(function(data) {
          this.subscriptionResource.getAmount = this.subscriptionResource.getAmount.bind(this.subscriptionResource);
          return this.subscriptionResource.getAmount({userId: userId, yearId: data.id});
        }.bind(this));
    }
};
