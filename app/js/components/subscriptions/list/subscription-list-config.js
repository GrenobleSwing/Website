angular
    .module('app.subscriptions.list', ['app.users', 'app.subscriptions.common', 'ui.router'])
    .config(['$stateProvider', SubscriptionsRouterConfig])
    .controller('gsSubscriptionsList', SubscriptionsListDirective)
    .controller('subscriptionsViewController', ['identityService', 'subscriptionService', SubscriptionsListController]);
