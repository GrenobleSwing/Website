angular.module('app.summary', ['app.users', 'ui.router', 'app.subscriptions.common', 'app.year'])
    .config(['$stateProvider', SummaryRouterConfig])
    .directive('gsSubscriptionsSummary', SummaryDirective)
    .service('summaryService', ['subscriptionResource', 'yearService', SummaryService])
    .controller('summaryController', ['authenticationService', 'summaryService', SummaryController]);
