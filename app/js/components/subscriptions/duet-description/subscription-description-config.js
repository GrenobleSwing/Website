angular
    .module('app.subscriptions.description.duet', ['app.subscriptions.common', 'ui.bootstrap'])
    .directive('gsSubscriptionDuetDescription', SubscriptionDuetDescriptionDirective)
    .controller('subscriptionDuetDescriptionController', ['$scope', '$uibModal', 'subscriptionService',
      'subscriptionObservableService', SubscriptionDuetDescriptionController]);
