angular
  .module('app.subscriptions.summary', ['app.users', 'app.subscriptions.common'])
  .directive('gsSubscriptionsSummary', SubscriptionsAmountDirective)
  .service('subscriptionAmountResource', ['$filter', '$q', '$resource', FakeSubscriptionAmountResource])
  .service('subscriptionAmountService', ['subscriptionAmountResource', SubscriptionsAmountService])
  .controller('subscriptionsSummaryController', ['identityService', 'subscriptionAmountService', 'subscriptionObservableService', SubscriptionsSummaryController]);
