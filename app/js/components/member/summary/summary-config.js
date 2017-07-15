angular.module('app.summary', ['ui.router', 'app.auth', 'app.config'])
    .config(['$stateProvider', SummaryRouterConfig])
    .controller('summaryController', ['$scope', '$http', 'userDetails', 'config', SummaryController]);
