angular.module('app.subscriptions.actions.cancel', ['ui.bootstrap', 'app.subscriptions.common'])
    .controller('subscriptionCancelController', ['$scope', '$modal', 'subscriptionService', SubscriptionCancelController])
    .directive('gsSubscriptionCancel', SubscriptionCancelDirective);
