angular.module('app.subscriptions.actions.add', ['ui.bootstrap', 'app.subscriptions.common'])
    .controller('subscriptionAddController', ['$scope', '$modal', 'subscriptionService', SubscriptionAddController])
    .directive('gsSubscriptionAdd', SubscriptionAddDirective);
