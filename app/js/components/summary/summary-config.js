angular.module('app.summary', ['app.users', 'ui.router'])
    .config(['$stateProvider', SummaryRouterConfig])
    .directive('gsSubscriptionsSummary', SummaryDirective)
    .service('summaryResource', ['$timeout', '$filter', '$q', '$resource', FakeSummaryResource])
    .service('summaryService', ['$q', 'summaryResource', SummaryService])
    .controller('summaryController', ['identityService', 'summaryService', SummaryController]);
