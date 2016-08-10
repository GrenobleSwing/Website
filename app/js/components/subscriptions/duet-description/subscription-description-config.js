angular
    .module('app.subscriptions.description.duet', ['app.subscriptions.common'])
    .directive('gsSubscriptionDuetDescription', SubscriptionDuetDescriptionDirective)
    .controller('subscriptionDuetDescriptionController', ['$scope', 'subscriptionService', 'subscriptionObservableService', SubscriptionDuetDescriptionController]);
