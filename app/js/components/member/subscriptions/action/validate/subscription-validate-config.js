angular.module('app.subscriptions.actions.validate', ['app.subscriptions.common'])
    .controller('subscriptionValidateController', ['$scope', 'subscriptionCommandService', SubscriptionValidateController])
    .directive('gsSubscriptionValidate', SubscriptionValidateDirective);
