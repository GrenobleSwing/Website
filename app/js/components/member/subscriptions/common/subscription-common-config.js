angular.module('app.subscriptions.common', ['app.config', 'app.year'])
    .service('subscriptionObservableService', SubscriptionObservableService)
    .service('subscriptionResource', ['$resource', 'config', SubscriptionResource])
    .service('SubscriptionCommandService', ['$http', 'config', SubscriptionCommandService])
    .service('subscriptionService', ['$q', 'subscriptionResource', 'yearService', SubscriptionService]);