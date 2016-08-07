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

    validateSubscription: function validateSubscription(subscription) {
      subscription.selected = true;
      subscription.state = "waiting_for_payment";

      var requiredSubscriptions = this.subscriptionService.getRequiredSubscriptions(subscription, this.list);
      var requiredSubscription = requiredSubscriptions.length ? requiredSubscriptions[0] : {topicId: 0, description: "not found"};
      if (requiredSubscription.topicId !== 0 && !requiredSubscription.selected) {
        requiredSubscription.selected = true;
        requiredSubscription.state = "waiting_for_payment";
      }

      this.dirty = true;
    },

    validateDuetSubscription: function validateDuetSubscription(subscription) {
      var modalInstance = this.modal.open({
            animation: true,
            templateUrl: 'partials/subscription.duet.html',
            controller: 'subscriptionDuetController',
            controllerAs: 'ctrl',
            resolve: {
              role: function () {
                return subscription.role;
              },
              partnerName: function () {
                return subscription.partnerName;
              }
            }
          });

          modalInstance.result.then(function (value) {
            subscription.role = value.role;
            subscription.partnerName = value.partnerName;
            this.validateSubscription(subscription);
          }.bind(this), function () {

          });
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
