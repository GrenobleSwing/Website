angular.module('app.account', ['app.config', 'ui.router', 'ngSanitize'])
  .config(['$stateProvider', AccountRouterConfig])
  // .directive('gsDatepicker', AccountDatepickerDirective)
  .controller('accountController', ['$http', 'config', 'userDetails', '$sce', '$scope', AccountController]);
