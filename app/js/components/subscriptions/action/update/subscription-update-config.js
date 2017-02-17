angular.module('app.subscriptions.actions.update', ['ui.bootstrap', 'app.subscriptions.common'])
    .controller('subscriptionUpdateController', ['$scope', '$uibModal', 'subscriptionService', SubscriptionUpdateController])
    .directive('gsSubscriptionUpdate', SubscriptionUpdateDirective);
