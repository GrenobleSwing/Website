angular.module('app.subscriptions.actions.add', ['ui.bootstrap', 'app.subscriptions.common'])
    .controller('subscriptionAddController', ['$scope', '$uibModal', 'subscriptionService', 'subscriptionObservableService', SubscriptionAddController])
    .directive('gsSubscriptionAdd', SubscriptionAddDirective);
