function SubscriptionsSummaryController(authenticationService, subscriptionAmountService, subscriptionObservableService) {
  this.subscriptionService = subscriptionAmountService;
  this.subscriptionObservableService = subscriptionObservableService;

  this.user = authenticationService.getIdentity();

  this.init_();
}

SubscriptionsSummaryController.prototype = {
    init_ : function init_() {
      this.refresh_ = this.refresh_.bind(this);
      this.handleSuccess_ = this.handleSuccess_.bind(this);

      this.subscriptionObservableService.addListener(this.refresh_);

      this.refresh_();
    },

    refresh_ : function refresh_() {
      this.amount = this.subscriptionService.getAmountByUserId(this.user.id).then(this.handleSuccess_);
    },

    handleSuccess_ : function handleSuccess_(data) {
      this.amount = data;
      return this.amount;
    }
};
