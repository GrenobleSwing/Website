function SummaryController(authenticationService, summaryService) {
  this.summaryService = summaryService;
  this.list = [];
  this.total = 0;

  this.init_ = this.init_.bind(this);
  this.handleListSuccess_ = this.handleListSuccess_.bind(this);
  this.handleAmountSuccess_ = this.handleAmountSuccess_.bind(this);

  this.identity = authenticationService.getIdentity().then(this.init_);

}

SummaryController.prototype = {
    init_ : function init_(identity) {
      this.identity = identity;
      this.summaryService.getSubscriptionsByUserId(identity.userId).then(this.handleListSuccess_);
      this.summaryService.getAmountByUserId(identity.userId).then(this.handleAmountSuccess_);
    },

    handleListSuccess_ : function handleListSuccess_(data) {
      this.list = data;
      return this.list;
    },

    handleAmountSuccess_ : function handleAmountSuccess_(data) {
      this.total = data;
      return this.total;
    }
};
