angular.module('app.subscriptions.actions.cancel', ['ui.bootstrap', 'app.subscriptions.common'])
    .controller('subscriptionCancelController', ['$scope', '$uibModal', 'SubscriptionCommandService', SubscriptionCancelController])
    .directive('gsSubscriptionCancel', SubscriptionCancelDirective);
