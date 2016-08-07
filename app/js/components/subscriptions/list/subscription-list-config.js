angular
    .module('app.subscriptions.view', ['app.users', 'app.subscriptions.common', 'ui.bootstrap'])
    .controller('subscriptionsViewController', ['$uibModal', 'identityService', 'subscriptionService', SubscriptionsViewController]);
