angular.module('app.subscriptions.common', ['app.config'])
    .service('subscriptionObservableService', SubscriptionObservableService)
    // .service('subscriptionResource', ['$timeout', '$filter', '$q', '$resource', FakeSubscriptionResource])
    .service('subscriptionResource', ['$resource', 'config', SubscriptionResource])
    .service('subscriptionService', ['$q', 'subscriptionResource', SubscriptionService]);
