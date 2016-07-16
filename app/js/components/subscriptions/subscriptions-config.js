angular
  .module('app.subscriptions', ['app.users'])
  .directive('gsSubscriptionsView', SubscriptionsViewDirective)
  .service('subscriptionResource', ['$timeout', '$filter', '$q', '$resource', FakeSubscriptionResource])
  .service('subscriptionService', ['subscriptionResource', SubscriptionService])
  .controller('subscriptionsViewController', ['subscriptionService', SubscriptionsViewController]);
