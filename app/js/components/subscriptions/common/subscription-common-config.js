angular
    .module('app.subscriptions.common', ['ui.router'])
    .config(['$stateProvider', SubscriptionsRouterConfig])
    .service('subscriptionResource', ['$timeout', '$filter', '$q', '$resource', FakeSubscriptionResource])
    .service('subscriptionService', ['subscriptionResource', SubscriptionService]);
