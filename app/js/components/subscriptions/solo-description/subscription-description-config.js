angular
    .module('app.subscriptions.description.solo', ['app.subscriptions.common'])
    .directive('gsSubscriptionSoloDescription', SubcriptionSoloDescriptionDirective)
    .controller('subscriptionSoloDescriptionController', [SubscriptionSoloDescriptionController]);
