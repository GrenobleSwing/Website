angular.module('app.summary', ['ui.router', 'app.auth', 'app.config', 'ngSanitize'])
    .config(['$stateProvider', SummaryRouterConfig])
    .controller('summaryController', ['$scope', '$http', 'userDetails', 'config', '$sce', SummaryController]);
