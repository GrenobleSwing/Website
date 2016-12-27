angular.module('app.subscriptions.actions.add', ['app.subscriptions.common'])
    .controller('subscriptionAddController', ['subscriptionService', SubscriptionAddController])
    .directive('gsSubscriptionAdd', SubscriptionAddDirective);
