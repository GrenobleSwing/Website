angular
    .module('app.subscriptions.description.duet', ['app.subscriptions.common'])
    .directive('gsSubscriptionDuetDescription', SubcriptionDuetDescriptionDirective)
    .controller('subscriptionDuetDescriptionController', [subscriptionDuetDescriptionController]);
