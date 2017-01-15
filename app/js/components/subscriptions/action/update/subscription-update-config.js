angular.module('app.subscriptions.actions.update', ['ui.bootstrap', 'app.subscriptions.common'])
    .controller('subscriptionUpdateController', ['$scope', '$modal', 'subscriptionService', SubscriptionUpdateController])
    .directive('gsSubscriptionUpdate', SubscriptionUpdateDirective);
