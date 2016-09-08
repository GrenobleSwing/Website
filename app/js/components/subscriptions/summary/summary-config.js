angular.module('app.summary', ['app.users', 'ui.router', 'app.subscriptions.common'])
    .config(['$stateProvider', SummaryRouterConfig])
    .directive('gsSubscriptionsSummary', SummaryDirective)
    .service('summaryService', ['subscriptionResource', SummaryService])
    .controller('summaryController', ['identityService', 'summaryService', SummaryController]);
