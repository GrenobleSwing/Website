angular
    .module('app.subscriptions.common', [])
    .service('subscriptionObservableService', SubscriptionObservableService)
    .service('subscriptionResource', ['$timeout', '$filter', '$q', '$resource', FakeSubscriptionResource])
    .service('subscriptionService', ['subscriptionResource', SubscriptionService]);
