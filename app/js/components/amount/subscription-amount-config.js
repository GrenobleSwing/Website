angular
  .module('app.subscriptions.amount', ['app.users'])
  .directive('gsSubscriptionsSummary', SubscriptionsAmountDirective)
  .service('subscriptionAmountResource', ['$filter', '$q', '$resource', FakeSubscriptionAmountResource])
  .service('subscriptionAmountService', ['subscriptionAmountResource', SubscriptionsAmountService])
  .controller('subscriptionsSummaryController', ['sessionService', 'subscriptionAmountService', SubscriptionsSummaryController]);
