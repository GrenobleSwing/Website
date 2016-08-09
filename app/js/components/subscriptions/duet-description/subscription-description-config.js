angular
    .module('app.subscriptions.description.duet', ['app.subscriptions.common'])
    .directive('gsSubscriptionDuetDescription', SubscriptionDuetDescriptionDirective)
    .controller('subscriptionDuetDescriptionController', [SubscriptionDuetDescriptionController]);
