angular.module('app.subscriptions.actions.cancel', ['app.subscriptions.common'])
    .controller('subscriptionCancelController', ['subscriptionService', SubscriptionCancelController])
    .directive('gsSubscriptionCancel', SubscriptionCancelDirective);
