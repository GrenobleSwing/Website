angular.module('app.subscriptions.actions.pay', ['app.subscriptions.common'])
    .controller('subscriptionPayController', ['$scope', 'subscriptionCommandService', SubscriptionPayController])
    .directive('gsSubscriptionPay', SubscriptionPayDirective);
