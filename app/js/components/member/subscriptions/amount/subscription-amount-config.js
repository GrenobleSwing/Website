angular.module('app.subscriptions.amount', ['app.auth', 'app.subscriptions.common'])
  .directive('gsSubscriptionsAmount', SubscriptionsAmountDirective)
  .service('subscriptionAmountResource', ['$filter', '$q', '$resource', FakeSubscriptionAmountResource])
  .service('subscriptionAmountService', ['subscriptionAmountResource', SubscriptionsAmountService])
  .controller('subscriptionsSummaryController', ['authenticationService', 'subscriptionAmountService', 'subscriptionObservableService', SubscriptionsSummaryController]);
