angular.module('app.subscriptions.actions.cancel', ['app.subscriptions.common'])
    .controller('subscriptionRemoveController', ['$scope', 'subscriptionCommandService', SubscriptionRemoveController])
    .directive('gsSubscriptionRemove', SubscriptionRemoveDirective);
