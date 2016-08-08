angular
    .module('app.subscriptions.view', ['app.users', 'app.subscriptions.common', 'ui.router'])
    .config(['$stateProvider', SubscriptionsRouterConfig])
    .controller('subscriptionsViewController', ['identityService', 'subscriptionService', SubscriptionsViewController]);
