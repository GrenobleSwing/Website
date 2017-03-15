function SubscriptionDuetDescriptionController($scope, $modal, subscriptionService, subscriptionObservableService) {
  this.scope = $scope;
  this.modal = $modal;
  this.subscriptionService = subscriptionService;
  this.subscription = {$ok: false};
  this.subscriptionId = $scope.subscription.id;
  this.subscriptionObservableService = subscriptionObservableService;

  this.init_();
}

SubscriptionDuetDescriptionController.prototype = {

  init_: function init_() {
    this.activateSubscription_ = this.activateSubscription_.bind(this);
    this.handleUpdateSuccess_ = this.handleUpdateSuccess_.bind(this);
    this.handleValidationSuccess_ = this.handleValidationSuccess_.bind(this);
    this.handleDestroy_ = this.handleDestroy_.bind(this);

    this.subscriptionObservableService.addListener(this.activateSubscription_);

    this.subscription = this.subscriptionService.getSubscriptionById(this.subscriptionId).then(function(data) {
      this.subscription = data;
      this.subscription.$ok = true;
    }.bind(this));

    this.scope.$on("$destroy", this.handleDestroy_);
  },

  handleValidationSuccess_: function handleValidationSuccess_() {
    this.subscription.selected = true;
    this.subscription.state = "waiting_for_payment";

    this.subscriptionService.saveSubscription(this.subscription);

    for (var i = 0; i < this.subscription.requirements.length; i++) {
      this.subscriptionObservableService.notifyListeners(this.subscription.requirements[i]);
    }
  },

  handleUpdateSuccess_: function handleUpdateSuccess_() {
    this.subscriptionService.saveSubscription(this.subscription);
  },

  validateSubscription: function validateSubscription() {
    var subscription = this.subscription;
    var modalInstance = this.modal.open({
          animation: true,
          templateUrl: 'components/member/subscriptions/duet-dialog/subscription.duet.dialog.html',
          controller: 'subscriptionDuetDialogController',
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
          this.subscription.role = value.role;
          this.subscription.partnerName = value.partnerName;
          this.handleValidationSuccess_(subscription);
        }.bind(this), function () {

        });
  },

  activateSubscription_: function activateSubscription_(data) {
    if (data.topicId === this.subscription.topicId && !this.subscription.selected) {
      this.subscription.isOpen = true;
      this.validateSubscription();
    }
  },

  isUpdatable : function isUpdatable() {
    return true;
  },

  updateSubscription: function updateSubscription() {
    var subscription = this.subscription;
    var modalInstance = this.modal.open({
          animation: true,
          templateUrl: 'components/member/subscriptions/duet-dialog/subscription.duet.dialog.html',
          controller: 'subscriptionDuetDialogController',
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
          this.subscription.role = value.role;
          this.subscription.partnerName = value.partnerName;
          this.handleUpdateSuccess_(subscription);
        }.bind(this), function () {

        });
  },

  isCancellable : function isCancellable() {
    return true;
  },

  cancelSubscription: function cancelSubscription() {
    this.subscriptionService.cancelSubscription(this.subscription).then(function() {

    }.bind(this));
  },

  handleDestroy_: function handleDestroy_() {
    this.subscriptionObservableService.removeListener(this.activateSubscription_);
  }
};
