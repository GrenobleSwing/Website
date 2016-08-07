angular
    .module('app.subscriptions.view', ['app.users', 'ui.router', 'ui.bootstrap'])
    .config(['$stateProvider', SubscriptionsRouterConfig])
    .service('subscriptionResource', ['$timeout', '$filter', '$q', '$resource', FakeSubscriptionResource])
    .service('subscriptionService', ['subscriptionResource', SubscriptionService])
    .controller('subscriptionsViewController', ['$uibModal', 'identityService', 'subscriptionService', SubscriptionsViewController]);
