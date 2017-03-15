angular.module('app.subscriptions.list', ['app.users', 'app.subscriptions.common', 'ui.router'])
    .config(['$stateProvider', SubscriptionsRouterConfig])
    .directive('gsSubscriptionsList', SubscriptionsListDirective)
    .controller('subscriptionsListController', ['identityService', 'subscriptionService', SubscriptionsListController]);
