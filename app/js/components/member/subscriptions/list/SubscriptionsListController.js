function SubscriptionsListController(authenticationService, subscriptionService) {
  this.subscriptionService = subscriptionService;
  this.list = undefined;
  this.originalList = undefined;
  this.dirty = false;

  this.init_ = this.init_.bind(this);
  this.handleInitSuccess_ = this.handleInitSuccess_.bind(this);

  this.identity = authenticationService.getIdentity().then(this.init_);

}

SubscriptionsListController.prototype = {
    init_ : function init_(identity) {
      this.identity = identity.data;
      this.subscriptionService.getSubscriptionsByUserId(this.identity.userId).then(this.handleInitSuccess_);
    },

    handleInitSuccess_ : function handleInitSuccess_(data) {
      this.list = angular.copy(data);
      this.originalList = angular.copy(data);
      return this.list;
    },

    openDescription : function openDescription(subscription) {
      subscription.isOpen = !subscription.isOpen;
    }
};
