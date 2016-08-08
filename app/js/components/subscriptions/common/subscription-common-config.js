angular
    .module('app.subscriptions.common', [])
    .service('subscriptionResource', ['$timeout', '$filter', '$q', '$resource', FakeSubscriptionResource])
    .service('subscriptionService', ['subscriptionResource', SubscriptionService]);
