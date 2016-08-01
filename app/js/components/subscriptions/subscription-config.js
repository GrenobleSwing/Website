angular
    .module('app.subscriptions.view', ['app.users', 'ui.router'])
    .config(['$stateProvider', SubscriptionsRouterConfig])
    .service('subscriptionResource', ['$timeout', '$filter', '$q', '$resource', FakeSubscriptionResource])
    .service('subscriptionService', ['subscriptionResource', SubscriptionService])
    .controller('subscriptionsViewController', ['identityService', 'subscriptionService', SubscriptionsViewController]);
