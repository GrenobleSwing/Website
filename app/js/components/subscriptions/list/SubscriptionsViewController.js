function SubscriptionsViewController($modal, identityService, subscriptionService) {
  this.subscriptionService = subscriptionService;
  this.list = undefined;
  this.originalList = undefined;
  this.dirty = false;
  this.modal = $modal;

  this.init_ = this.init_.bind(this);
  this.handleInitSuccess_ = this.handleInitSuccess_.bind(this);
  this.handleAddSuccess_ = this.handleAddSuccess_.bind(this);
  this.handleRemoveSuccess_ = this.handleRemoveSuccess_.bind(this);

  this.identity = identityService.getIdentity().then(this.init_);

}

SubscriptionsViewController.prototype = {
    init_ : function init_(identity) {
      this.identity = identity;
      this.subscriptionService.getSubscriptionsByUserId(identity.id).then(this.handleInitSuccess_);
    },

    getRequiredSubscriptions : function getRequiredSubscriptions(subscription) {
      return this.subscriptionService.getRequiredSubscriptions(this.identity.id, subscription);
    },

    saveSubscriptions : function saveSubscriptions() {
      this.subscriptionService.saveSubscriptions(this.list);
    },

    handleInitSuccess_ : function handleInitSuccess_(data) {
      this.list = data;
      this.originalList = angular.copy(data);
      return this.list;
    },

    handleAddSuccess_ : function handleAddSuccess_(data) {
      return data;
    },

    handleRemoveSuccess_ : function handleRemoveSuccess_(data) {
      return data;
    },

    openDescription : function openDescription(subscription) {
      subscription.isOpen = !subscription.isOpen;
    },

    cancelChanges: function cancelChanges() {
      this.list = angular.copy(this.originalList);
    }
};
