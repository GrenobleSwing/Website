angular.module('app.subscriptions.actions.update', ['app.subscriptions.common'])
    .controller('subscriptionUpdateController', ['subscriptionService', SubscriptionUpdateController])
    .directive('gsSubscriptionUpdate', SubscriptionUpdateDirective);
