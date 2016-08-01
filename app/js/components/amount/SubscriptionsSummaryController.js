function SubscriptionsSummaryController(identityService, subscriptionAmountService) {
  this.subscriptionService = subscriptionAmountService;
  this.user = identityService.getCurrentUser();

  this.init_();
}

SubscriptionsSummaryController.prototype = {
    init_ : function init_() {
      this.handleSuccess_ = this.handleSuccess_.bind(this);

      this.refresh();
    },

    refresh : function refresh() {
      this.amount = this.subscriptionService.getAmountByUserId(this.user.id).then(this.handleSuccess_);
    },

    handleSuccess_ : function handleSuccess_(data) {
      this.amount = data;
      return this.amount;
    }
};
