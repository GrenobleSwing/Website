angular.module('app.subscriptions.description.solo', ['app.subscriptions.common'])
    .directive('gsSubscriptionSoloDescription', SubscriptionSoloDescriptionDirective)
    .controller('subscriptionSoloDescriptionController', ['$scope', 'subscriptionService', 'subscriptionObservableService', SubscriptionSoloDescriptionController]);