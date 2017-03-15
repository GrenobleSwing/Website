angular.module('app.subscriptions.actions.cancel', ['app.subscriptions.common'])
    .controller('subscriptionCancelController', ['$scope', 'subscriptionCommandService', SubscriptionCancelController])
    .directive('gsSubscriptionCancel', SubscriptionCancelDirective);
