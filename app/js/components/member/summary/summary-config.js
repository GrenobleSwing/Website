angular.module('app.summary', ['paypal-button', 'ui.router', 'app.auth', 'app.config'])
    .config(['$stateProvider', SummaryRouterConfig])
    .controller('summaryController', ['$scope', '$http', 'userDetails', 'config', SummaryController]);
