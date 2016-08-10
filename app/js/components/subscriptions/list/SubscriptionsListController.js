function SubscriptionsListController(identityService, subscriptionService) {
  this.subscriptionService = subscriptionService;
  this.list = undefined;
  this.originalList = undefined;
  this.dirty = false;

  this.init_ = this.init_.bind(this);
  this.handleInitSuccess_ = this.handleInitSuccess_.bind(this);

  this.identity = identityService.getIdentity().then(this.init_);

}

SubscriptionsListController.prototype = {
    init_ : function init_(identity) {
      this.identity = identity;
      this.subscriptionService.getSubscriptionsByUserId(identity.id).then(this.handleInitSuccess_);

      console.info("SubscriptionsListController");
    },

    saveSubscriptions : function saveSubscriptions() {
      this.subscriptionService.saveSubscriptions(this.list);
    },

    handleInitSuccess_ : function handleInitSuccess_(data) {
      this.list = data;
      this.originalList = angular.copy(data);
      return this.list;
    },

    openDescription : function openDescription(subscription) {
      subscription.isOpen = !subscription.isOpen;
    }
};
