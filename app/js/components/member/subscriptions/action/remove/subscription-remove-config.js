angular.module('app.subscriptions.actions.remove', ['app.subscriptions.common'])
    .controller('subscriptionRemoveController', ['$scope', 'subscriptionCommandService', SubscriptionRemoveController])
    .directive('gsSubscriptionRemove', SubscriptionRemoveDirective);
