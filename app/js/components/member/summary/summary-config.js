angular.module('app.summary', ['ui.router', 'app.auth', 'app.config', 'app.payment'])
    .config(['$stateProvider', SummaryRouterConfig])
    .controller('summaryController', ['$http', 'userDetails', 'config', SummaryController]);
