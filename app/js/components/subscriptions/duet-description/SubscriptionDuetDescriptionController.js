function SubscriptionDuetDescriptionController($scope, subscriptionService, subscriptionObservableService) {
  this.scope = $scope;
  this.subscriptionService = subscriptionService;
  this.subscription = {$ok: false};
  this.subscriptionId = $scope.subscription.id;
  this.subscriptionObservableService = subscriptionObservableService;

  this.init_();
}

SubscriptionDuetDescriptionController.prototype = {

  init_: function init_() {
    this.activateSubscription_ = this.activateSubscription_.bind(this);
    this.handleSuccess_ = this.handleSuccess_.bind(this);
    this.handleDestroy_ = this.handleDestroy_.bind(this);

    this.subscriptionObservableService.addListener(this.activateSubscription_);

    this.subscription = this.subscriptionService.getSubscriptionById(this.subscriptionId).then(function(data) {
      this.subscription = data;
      this.subscription.$ok = true;
    }.bind(this));

    this.scope.$on("$destroy", this.handleDestroy_);
  },

  handleSuccess_: function handleSuccess_() {
    this.subscription.selected = true;
    this.subscription.state = "waiting_for_payment";

    this.subscriptionObservableService.notifyListeners(this.subscription);
  },

  validateSubscription: function validateSubscription() {
    var subscription = this.subscription;
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
          this.subscription.role = value.role;
          this.subscription.partnerName = value.partnerName;
          this.handleSuccess_(subscription);
        }.bind(this), function () {

        });
  },

  activateSubscription_: function activateSubscription_(data) {
    if (data.id === this.subscription.id && !this.subscription.selected) {
      this.validateSubscription();
    }
  },

  handleDestroy_: function handleDestroy_() {
    this.subscriptionObservableService.removeListener(this.activateSubscription_);
  }
};
